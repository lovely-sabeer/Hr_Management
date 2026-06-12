import { useEffect, useState } from "react";
import styles from "./AttendanceManagement.module.css";
import StatCard from "../../Components/StatCard/StatCard";
import ReportTable from "../../Components/ReportTable/ReportTable";
import { attendanceTableConfig } from "../../Data/TableData";
import ReportToolbar from "../../Components/ReportToolbar/ReportToolbar";
import {
	exportAttendance,
	getAttendanceList,
	getAttendanceStat,
} from "../../Data/api";
import { Plane, UserCheck, Users, UserX } from "lucide-react";

const toolbarConfig = {
	searchPlaceholder: "Search employees...",
	exportLabel: "Export Attendance",
	dropdowns: [
		[
			{ value: "all", label: "All Departments" },
			{ value: "Engineering", label: "Engineering" },
			{ value: "Marketing", label: "Marketing" },
			{ value: "Design", label: "Design" },
		],
		[
			{ value: "all", label: "All Status" },
			{ value: "Present", label: "Present" },
			{ value: "Absent", label: "Absent" },
			{ value: "HalfDay", label: "Half Day" },
		],
		[
			{ value: "Today", label: "Today" },
			{ value: "ThisWeek", label: "This Week" },
			{ value: "ThisMonth", label: "This Month" },
			{ value: "ThisYear", label: "This Year" },
		],
	],
};

const AttendanceManagement = () => {
	const [search, setSearch] = useState("");

	const [dropdownValues, setDropdownValues] = useState<string[]>(() => {
		return toolbarConfig.dropdowns.map(
			(options) => options[0]?.value || ""
		);
	});
	const [listData, setListData] = useState(attendanceTableConfig);
	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);

	const [statCards, setStatCards] = useState({
		totalEmployees: 0,
		presentCount: 0,
		absentCount: 0,
		continuousLeaveCount: 0,
	});

	const exportCsv = async () => {
		try {
			const response = await exportAttendance({
				search,
				department:
					dropdownValues[0] === "all" ? "" : dropdownValues[0],
				status:
					dropdownValues[1] === "all" ? "" : dropdownValues[1],
				date:
					dropdownValues[2] === "all" ? "" : dropdownValues[2],
			});

			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(
				new Blob([response.data])
			);

			link.setAttribute("download", "attendance.csv");

			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Export failed:", error);
		}
	};

	useEffect(() => {
		const getStat = async () => {
			try {
				const res = await getAttendanceStat();
				setStatCards(res.data);
				console.log(res.data)
			} catch (error) {
				console.error("Failed to load stats:", error);
			}
		};

		getStat();
	}, []);

	useEffect(() => {
		setPage(1);
	}, [search, dropdownValues]);

	useEffect(() => {
		const fetchAttendance = async () => {

			try {
				const result = await getAttendanceList({
					search,
					department:
						dropdownValues[0] === "all"
							? ""
							: dropdownValues[0],
					status:
						dropdownValues[1] === "all"
							? ""
							: dropdownValues[1],
					date:
						dropdownValues[2] === "all"
							? ""
							: dropdownValues[2],
					page,
					pageSize,
				});

				const rows = (result.data?.data || []).map(
					(employee: any) => ({
						id: employee.id,
						employeeId: employee.employeeId,
						name: employee.name,
						department: employee.department,
						date: new Date(
							employee.date
						).toLocaleDateString(),
						status: employee.status,
					})
				);

				setListData((prev) => ({
					...prev,
					rows,
				}));

			} catch (error) {
				console.error("Failed to load attendance:", error);
			}
		};

		fetchAttendance();
	}, [search, dropdownValues, page, pageSize]);

	const attendanceStats = [
		{
			id: 1,
			title: "Total Employees",
			value: statCards.totalEmployees,
			changeType: "success",
			icon: Users,
		},
		{
			id: 2,
			title: "Present Today",
			value: statCards.presentCount,
			changeType: "success",
			icon: UserCheck,
		},
		{
			id: 3,
			title: "Absent Today",
			value: statCards.absentCount,
			changeType: "danger",
			icon: UserX,
		},
		{
			id: 4,
			title: "Continuous Leave",
			value: statCards.continuousLeaveCount,
			changeType: "warning",
			icon: Plane,
		},
	];

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

			<ReportToolbar
				config={toolbarConfig}
				searchValue={search}
				onSearchChange={setSearch}
				dropdownValues={dropdownValues}
				setDropdownValues={setDropdownValues}
				onExport={exportCsv}
			/>

			<ReportTable config={listData}/>
		</div>
	);
};

export default AttendanceManagement;