import { CalendarClock, CalendarDays, FileText, LayoutDashboard, Settings, Users, Wallet, Check, X, Trash2, Plus, UserPlus, UserCheck, Plane, UserX  } from "lucide-react";

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

const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { id: "employee", label: "Employees", icon: Users, path: "/employees" },
    { id: "attendance", label: "Attendance", icon: CalendarDays, path: "/attendance", },
    { id: "leave", label: "Leave", icon: CalendarClock, path: "/leave" },
    { id: "salary", label: "Salary", icon: Wallet, path: "/salary" },
    { id: "reports", label: "Reports", icon: FileText, path: "/reports" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

// 2nd

function handleMarkPaid() {}

function handleMarkUnpaid() {}

export const salaryToolbarData = {
	searchPlaceholder: "Search employee ID or name...",
	exportLabel: "Export CSV",

	dropdowns: [
		[
			{ value: "all", label: "All Status" },
			{ value: "paid", label: "Paid" },
			{ value: "unpaid", label: "Unpaid" },
		],
		[
			{ value: "oct2023", label: "October 2023" },
			{ value: "sep2023", label: "September 2023" },
			{ value: "aug2023", label: "August 2023" },
		],
	],
};

export const salaryBulkButtons = [
	{
		name: "Mark Paid",
		icon: Check,
		handleClick: handleMarkPaid,
	},
	{
		name: "Mark Unpaid",
		icon: X,
		handleClick: handleMarkUnpaid,
	},
];

export const employeeToolbarData = {
	searchPlaceholder: "Search employees...",
	exportLabel: "CSV Export",

	dropdowns: [
		[
			{ value: "all", label: "All Departments" },
			{ value: "engineering", label: "Engineering" },
			{ value: "design", label: "Design" },
			{ value: "marketing", label: "Marketing" },
			{ value: "hr", label: "Human Resources" },
		],
	],
};
function handleAddEmployee() {}

function handleDeleteEmployees() {}

export const employeeBulkButtons = [
	{
		name: "Delete Selected",
		icon: Trash2,
		handleClick: handleDeleteEmployees,
	},
	{
		name: "Add Employee",
		icon: Plus,
		handleClick: handleAddEmployee,
	},
];


export const attendanceStats = [
    {
        id: 1,
        title: "Total Employees",
        value: "1,248",
        change: "+2.4%",
        changeType: "success",
        icon: Users,
    },
    {
        id: 2,
        title: "Present Today",
        value: "1,148",
        change: "92%",
        changeType: "success",
        icon: UserCheck,
    },
    {
        id: 3,
        title: "Absent Today",
        value: "52",
        change: "4.2%",
        changeType: "danger",
        icon: UserX,
    },
    {
        id: 4,
        title: "On Leave",
        value: "48",
        change: "Active",
        changeType: "warning",
        icon: Plane,
    },
];

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