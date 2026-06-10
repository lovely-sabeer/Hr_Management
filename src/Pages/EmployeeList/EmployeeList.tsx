import { useState } from "react";
import styles from "./EmployeeList.module.css";
import ReportToolbar from "../../Components/ReportToolbar/ReportToolbar";
import ReportBulkActions from "../../Components/ReportBulkActions/ReportBulkActions";
import ReportTable from "../../Components/ReportTable/ReportTable";
import {
	employeeToolbarData,
	employeeBulkButtons,
} from "../../Data/Data";
import { employeeTableConfig } from "../../Data/TableData";

const EmployeeList = () => {
	const [search, setSearch] = useState("");
	const [selectedRows, setSelectedRows] = useState<number[]>([]);

	const handleSelectRow = (id: number) => {
		setSelectedRows(prev =>
			prev.includes(id)
				? prev.filter(item => item !== id)
				: [...prev, id]
		);
	};

	const handleSelectAll = () => {
		if (
			selectedRows.length ===
			employeeTableConfig.rows.length
		) {
			setSelectedRows([]);
			return;
		}

		setSelectedRows(
			employeeTableConfig.rows.map(row => row.id)
		);
	};

	const handleActionClick = (
		action: string,
		row: any
	) => {
		switch (action) {
			case "edit":
				console.log("Edit Employee", row);
				break;

			case "delete":
				console.log("Delete Employee", row);
				break;

			default:
				break;
		}
	};

	return (
		<div className={styles.El__container}>
			<ReportToolbar
				config={employeeToolbarData}
				searchValue={search}
				onSearchChange={setSearch}
				onExport={() => console.log("Export Employees")}
			/>

			<ReportBulkActions
				buttons={employeeBulkButtons}
				selectedCount={selectedRows.length}
			/>

			<ReportTable
				config={employeeTableConfig}
				selectedRows={selectedRows}
				onSelectRow={handleSelectRow}
				onSelectAll={handleSelectAll}
				onActionClick={handleActionClick}
			/>
		</div>
	);
};

export default EmployeeList;