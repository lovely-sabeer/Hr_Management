import { useState } from "react";
import styles from "./SalaryManagement.module.css";
import ReportToolbar from "../../Components/ReportToolbar/ReportToolbar";
import ReportBulkActions from "../../Components/ReportBulkActions/ReportBulkActions";
import ReportTable from "../../Components/ReportTable/ReportTable";
import {
	salaryToolbarData,
	salaryBulkButtons,
} from "../../Data/Data";
import { salaryTableConfig } from "../../Data/TableData";

const SalaryManagement = () => {
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
			salaryTableConfig.rows.length
		) {
			setSelectedRows([]);
			return;
		}

		setSelectedRows(
			salaryTableConfig.rows.map(row => row.id)
		);
	};

	const handleActionClick = (
		action: string,
		row: any
	) => {
		switch (action) {
			case "delete":
				console.log("Delete", row);
				break;
		}
	};

	return (
		<div className={styles.Slm__container}>
			<ReportToolbar
				config={salaryToolbarData}
				searchValue={search}
				onSearchChange={setSearch}
				onExport={() => {}}
			/>

			<ReportBulkActions
				buttons={salaryBulkButtons}
				selectedCount={selectedRows.length}
			/>

			<ReportTable
				config={salaryTableConfig}
				selectedRows={selectedRows}
				onSelectRow={handleSelectRow}
				onSelectAll={handleSelectAll}
				onActionClick={handleActionClick}
			/>
		</div>
	);
};

export default SalaryManagement;