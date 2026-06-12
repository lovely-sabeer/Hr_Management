import { useEffect, useState } from "react";
import styles from "./SalaryManagement.module.css";
import ReportToolbar from "../../Components/ReportToolbar/ReportToolbar";
import ReportBulkActions from "../../Components/ReportBulkActions/ReportBulkActions";
import ReportTable from "../../Components/ReportTable/ReportTable";
import { salaryToolbarData} from "../../Data/Data";
import { salaryTableConfig } from "../../Data/TableData";
import { exportSalary, getSalaryList, paySalary } from "../../Data/api";
import { Check, Clock } from "lucide-react";

const SalaryManagement = () => {
	const [search, setSearch] = useState("");
	const [dropdownValues, setDropdownValues] = useState<string[]>(() => {
		return salaryToolbarData.dropdowns.map(
			(options) => options[0]?.value || ""
		);
	});
	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const [listData, setListData] = useState(salaryTableConfig);
	const [refreshTrigger, setRefreshTrigger] = useState(false);
	const handleSelectRow = (id: number) => {
		setSelectedRows(prev =>
			prev.includes(id)
				? prev.filter(item => item !== id)
				: [...prev, id]
		);
	};
	function handleSalary(act:string) {
		paySalary({
			employeeIds: selectedRows,
			status: act,
		});
		setSelectedRows([]);
		setRefreshTrigger(prev => !prev);
	}
	const salaryBulkButtons = [
		{
			name: "Pay",
			icon: Check,
			handleClick: ()=>handleSalary("Paid"),
		},
		{
			name: "Hold",
			icon: Clock,
			handleClick: ()=>handleSalary("Hold"),
		},
	];

	const handleSelectAll = () => {
		if ( selectedRows.length === salaryTableConfig.rows.length) {
			setSelectedRows([]);
			return;
		}
		setSelectedRows(
			salaryTableConfig.rows.map(row => row.id)
		);
	};

	const exportCsv = async () => {
		try {
			const response = await exportSalary({
				search,
				department: dropdownValues[0],
				year: dropdownValues[1],
				month: dropdownValues[2],
			});
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(
				new Blob([response.data])
			);
			link.setAttribute("download", "salary.csv");
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Export failed:", error);
		}
	};

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const result = await getSalaryList({ 
					department: dropdownValues[0] || "", 
					year: dropdownValues[1] || "", 
					month: dropdownValues[2] || "", 
					page: 1, 
					pageSize: 10, 
					search: search 
				});
				
				const formattedRows = (result.data?.data || []).map((employee: any) => ({
					id: employee.id,
					employeeId: employee.employeeId,
					name: employee.employeeName,
					department: employee.department, 
					email: employee.email,
					amount: employee.amount,
					paymentDate: employee.paidDate,
					status: employee.status,
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
	}, [search, dropdownValues, refreshTrigger]);
	return (
		<div className={styles.Slm__container}>
			<ReportToolbar
				config={salaryToolbarData}
				searchValue={search}
				onSearchChange={setSearch}
				dropdownValues={dropdownValues}
				setDropdownValues={setDropdownValues}
				onExport={exportCsv}
			/>
			<ReportBulkActions
				buttons={salaryBulkButtons}
				selectedCount={selectedRows.length}
			/>
			<ReportTable
				config={listData}
				selectedRows={selectedRows}
				onSelectRow={handleSelectRow}
				onSelectAll={handleSelectAll}
			/>
		</div>
	);
};

export default SalaryManagement;