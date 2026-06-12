import {Users, Wallet, UserPlus, UserCheck, } from "lucide-react";

export const sidebarData = [
	{
		id: 1,
		title: "Dashboard",
		icon: "dashboard",
		path: "/dashboard"
	}, {
		id: 2,
		title: "Employees",
		icon: "groups",
		path: "/employees"
	}, {
		id: 3,
		title: "Attendance",
		icon: "calendar_today",
		path: "/attendance"
	}, {
		id: 4,
		title: "Salary",
		icon: "payments",
		path: "/salary"
	},
];

export const salaryToolbarData = {
	searchPlaceholder: "Search employee ID or name...",
	exportLabel: "Export CSV",

	dropdowns: [
		[
			{ value: "all", label: "All" },
			{ value: "Engineering", label: "Engineering" },
			{ value: "Design", label: "Design" },
			{ value: "Marketing", label: "Marketing" },
		],
		[
			{ value: "2023", label: "2023" },
			{ value: "2024", label: "2024" },
			{ value: "2025", label: "2025" },
			{ value: "2026", label: "2026" },
		],
		[
			{ value: "1", label: "January" },
			{ value: "2", label: "Febrary" },
			{ value: "3", label: "March" },
			{ value: "4", label: "April" },
			{ value: "5", label: "May" },
			{ value: "6", label: "June" },
			{ value: "7", label: "July" },
			{ value: "8", label: "Augest" },
			{ value: "9", label: "September" },
			{ value: "10", label: "October" },
			{ value: "11", label: "November" },
			{ value: "12", label: "December" },
		],
	],
};

export const employeeToolbarData = {
	searchPlaceholder: "Search employees...",
	exportLabel: "CSV Export",
	dropdowns: [
		[
			{ value: "all", label: "All" },
			{ value: "Engineering", label: "Engineering" },
			{ value: "Design", label: "Design" },
			{ value: "Marketing", label: "Marketing" },
		],
	],
};

export const employeeStats = [
	{
		id: 1,
		title: "Total Employees",
		value: "1,284",
		change: "+12%",
		changeType: "success",
		icon: Users,
	},
	{
		id: 2,
		title: "Paid This Month",
		value: "$452.8K",
		change: "Month",
		changeType: "neutral",
		icon: Wallet,
	},
	{
		id: 3,
		title: "New Joinees",
		value: "48",
		change: "48 New",
		changeType: "primary",
		icon: UserPlus,
	},
	{
		id: 4,
		title: "Present Today",
		value: "1,208",
		change: "94%",
		changeType: "success",
		icon: UserCheck,
	},
];