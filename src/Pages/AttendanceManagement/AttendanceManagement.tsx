import { useState } from "react";
import { Check, X, Clock3, Plane } from "lucide-react";
import styles from "./AttendanceManagement.module.css";
import StatCard from "../../Components/StatCard/StatCard";
import ReportTable from "../../Components/ReportTable/ReportTable";
import { attendanceTableConfig } from "../../Data/TableData";
import ReportToolbar from "../../Components/ReportToolbar/ReportToolbar";
import ReportBulkActions from "../../Components/ReportBulkActions/ReportBulkActions";
import { attendanceStats } from "../../Data/Data";



const toolbarConfig = {
	searchPlaceholder: "Search employees...",
	exportLabel: "Export Attendance",
	dropdowns: [
		[
			{ value: "all", label: "All Departments" },
			{ value: "engineering", label: "Engineering" },
			{ value: "design", label: "Design" },
			{ value: "marketing", label: "Marketing" },
			{ value: "hr", label: "HR" },
			{ value: "finance", label: "Finance" },
		],
		[
			{ value: "all", label: "All Status" },
			{ value: "present", label: "Present" },
			{ value: "absent", label: "Absent" },
			{ value: "leave", label: "On Leave" },
			{ value: "halfday", label: "Half Day" },
			{ value: "lateentry", label: "Late Entry" },
		],
		[
			{ value: "today", label: "Today" },
			{ value: "week", label: "This Week" },
			{ value: "month", label: "This Month" },
			{ value: "year", label: "This Year" },
		],
	],
}
function handleClick() {
	 
}

const buttons = [
	{name:"Present", icon: Check, handleClick},
	{name:"Absent", icon: X, handleClick},
	{name:"Leave", icon: Plane, handleClick},
	{name:"Half Day", icon: Clock3, handleClick},
]

const AttendanceManagement = () => {
    const [search, setSearch] = useState("");
	const [selectedRows, setSelectedRows] = useState<number[]>([]);

	const handleSelectRow = (id: number) => {
		setSelectedRows((prev) =>
			prev.includes(id)
				? prev.filter((item) => item !== id)
				: [...prev, id]
		);
	};

	const handleSelectAll = () => {
		if (
			selectedRows.length ===
			attendanceTableConfig.rows.length
		) {
			setSelectedRows([]);
			return;
		}

		setSelectedRows(
			attendanceTableConfig.rows.map((row) => row.id)
		);
	};
	
	const handleActionClick = (
		action: string,
		row: any
	) => {
		switch (action) {
			case "edit":
				console.log("Edit", row);
				break;

			case "delete":
				console.log("Delete", row);
				break;
		}
	};

    return (
        <div className={styles.Atm__container}>
            <div className={styles.Atm__statGrid}>
                {attendanceStats.map((card) => (
					<StatCard
						key={card.id}
						card={card}
					/>
				))}
            </div>
			{/* <ReportToolbar
				config={toolbarConfig}
				searchValue={search}
				onSearchChange={setSearch}
				onExport={() => console.log("export")}
			/> */}
            <ReportBulkActions buttons={buttons} selectedCount={selectedRows.length} />
			<ReportTable
				config={attendanceTableConfig}
				selectedRows={selectedRows}
				onSelectRow={handleSelectRow}
				onSelectAll={handleSelectAll}
				onActionClick={handleActionClick}
			/>
        </div>
    );
};

export default AttendanceManagement;