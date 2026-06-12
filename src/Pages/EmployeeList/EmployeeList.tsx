import { useEffect, useState } from "react";
import styles from "./EmployeeList.module.css";
import ReportToolbar from "../../Components/ReportToolbar/ReportToolbar";
import ReportBulkActions from "../../Components/ReportBulkActions/ReportBulkActions";
import ReportTable from "../../Components/ReportTable/ReportTable";
import { employeeToolbarData } from "../../Data/Data";
import { employeeTableConfig } from "../../Data/TableData";
import { exportEmployee, getEmployeeList, deleteEmployees, getEmployeeById, markAttendance } from "../../Data/api";
import AddNewEmployee from "../AddNewEmployee/AddNewEmployee";
import { Check, Clock3, Trash2, X } from "lucide-react";

const EmployeeList = () => {
	const [search, setSearch] = useState("");
	const [dropdownValues, setDropdownValues] = useState<string[]>(() => {
		return employeeToolbarData.dropdowns.map((options) => options[0]?.value || "");
	});
	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const [listData, setListData] = useState(employeeTableConfig);
	const [isOpen, setIsOpen] = useState(false);
	const [openFor, setOpenFor] = useState("create");
	const [viewData, setViewData] = useState(null);
	const [refreshTrigger, setRefreshTrigger] = useState(false);

	const handleSelectRow = (id: number) => {
		setSelectedRows(prev =>
			prev.includes(id)
				? prev.filter(item => item !== id)
				: [...prev, id]
		);
	};
	const onRowClick = async (row: any) => {
		const result = await getEmployeeById(row.id);
		setViewData(result.data);
		setOpenFor("view");
		setIsOpen(true);
	}

	const handleSelectAll = () => {
		if (selectedRows.length === listData.rows.length) {
			setSelectedRows([]);
			return;
		}
		setSelectedRows(listData.rows.map(row => row.id));
	};

	const exportCsv = async () => {
		const response = await exportEmployee({ search: search, department: dropdownValues[0] || "" })
		const link = document.createElement("a");
		link.href = window.URL.createObjectURL(new Blob([response.data]));
		link.setAttribute("download", `employees.csv`);
		document.body.appendChild(link);
		link.click();
		link.remove();
	};

	const handleActionClick = async (action: string, row: any) => {
		switch (action) {
			case "edit":
				console.log("Edit Employee", row);
				const result = await getEmployeeById(row.id);
				setViewData(result.data);
				setOpenFor("update");
				setIsOpen(true);
				break;
			case "delete":
				try {
					await deleteEmployees([row.id]);
					setSelectedRows(prev => prev.filter(id => id !== row.id));
					setRefreshTrigger(prev => !prev);
				} catch (err) {
					console.error("Delete failed:", err);
				}
				break;
			default:
				break;
		}
	};
	function handleattendance(act:string) {
		markAttendance({
			employeeIds: selectedRows,
			status: act,
		});
		setSelectedRows([]);
		setRefreshTrigger(prev => !prev);
	}
	const employeeBulkButtons = [
		{
			name: "Delete",
			icon: Trash2,
			handleClick: async () => {
				if (selectedRows.length === 0) return;
				try {
					await deleteEmployees(selectedRows);
					setSelectedRows([]);
					setRefreshTrigger(prev => !prev);
				} catch (err) {
					console.error("Bulk delete failed:", err);
				}
			},
		},
		{name:"Present", icon: Check, handleClick:()=>handleattendance("Present")},
		{name:"Absent", icon: X, handleClick:()=>handleattendance("Absent")},
		{name:"Half Day", icon: Clock3, handleClick:()=>handleattendance("HalfDay")},
	];

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const result = await getEmployeeList({ 
					department: dropdownValues[0] || "", 
					page: 1, 
					pageSize: 10, 
					search: search 
				});
				
				const formattedRows = (result.data?.data || []).map((employee: any) => ({
					id: employee.id,
					employeeId: employee.employeeId || `#EMP-${employee.id}`,
					name: employee.name,
					department: employee.department || "Engineering", 
					email: employee.email,
				}));

				setListData((prev) => ({
					...prev,
					rows: formattedRows,
				}));
			} catch (error) {
				console.error("Failed to load employees:", error);
			}
		};

		fetchEmployees();
	}, [search, dropdownValues, refreshTrigger, isOpen]);
	
	return (
		<div className={styles.El__container}>
			<div className={styles.header} style={{display:"flex", justifyContent:"space-between"}}>
				<h3>New Page</h3>
				<button className={styles.El__Button} onClick={() => { setIsOpen(true);  setOpenFor("create")}}>Add New User</button>
			</div>
			<ReportToolbar
				config={employeeToolbarData}
				searchValue={search}
				onSearchChange={setSearch}
				dropdownValues={dropdownValues}
				setDropdownValues={setDropdownValues}
				onExport={exportCsv}
			/>
			<ReportBulkActions
				buttons={employeeBulkButtons}
				selectedCount={selectedRows.length}
			/>
			<ReportTable
				config={listData}
				selectedRows={selectedRows}
				onSelectRow={handleSelectRow}
				onSelectAll={handleSelectAll}
				onActionClick={handleActionClick}
				onRowClick={onRowClick}
			/>
			{
				openFor === "create" ? 
					(<AddNewEmployee isOpen={isOpen} setIsOpen={setIsOpen} forUpdate={null} onRefresh={() => setRefreshTrigger(prev => !prev)} />)
					: openFor === "view" ? 
						(<AddNewEmployee isOpen={isOpen} setIsOpen={setIsOpen} forUpdate={false} initialData={viewData} />)
						:(<AddNewEmployee isOpen={isOpen} setIsOpen={setIsOpen} forUpdate={true} initialData={viewData} onRefresh={() => setRefreshTrigger(prev => !prev)} />)
			}

		</div>
	);
};

export default EmployeeList;


