import { Edit, Trash2 } from "lucide-react";
import type { ReportTableConfig } from "../Components/ReportTable/ReportTable";

export const attendanceTableConfig: ReportTableConfig  = {
	selectable: false,
	pagination: true,
	rowsPerPage: 10,
	actions: [],
	headers: [
		{ label: "EMPLOYEE ID", key: "employeeId", cellType: "text", },
		{ label: "EMPLOYEE", key: "name", cellType: "employee", },
		{ label: "DEPARTMENT", key: "department", cellType: "text", },
		{ label: "DATE", key: "date", cellType: "text", },
		{ label: "STATUS", key: "status", cellType: "status", },
	],

	rows:[]
	// [
	// 	{
	// 		id: 1,
	// 		employeeId: "EMP-1001",
	// 		name: "Alex Rivers",
	// 		email: "alex@nexus.com",
	// 		department: "Engineering",
	// 		date: "10-Jun-2026",
	// 		status: "Present",
	// 	},
	// 	{
	// 		id: 2,
	// 		employeeId: "EMP-1002",
	// 		name: "Sarah Chen",
	// 		email: "sarah@nexus.com",
	// 		department: "Design",
	// 		date: "10-Jun-2026",
	// 		status: "Absent",
	// 	},
	// 	{
	// 		id: 3,
	// 		employeeId: "EMP-1001",
	// 		name: "Alex Rivers",
	// 		email: "alex@nexus.com",
	// 		department: "Engineering",
	// 		date: "10-Jun-2026",
	// 		status: "Present",
	// 	},
	// 	{
	// 		id: 4,
	// 		employeeId: "EMP-1002",
	// 		name: "Sarah Chen",
	// 		email: "sarah@nexus.com",
	// 		department: "Design",
	// 		date: "10-Jun-2026",
	// 		status: "Absent",
	// 	},
	// ],
};

export const salaryTableConfig: ReportTableConfig = {
	selectable: true,

	pagination: true,

	rowsPerPage: 10,
	headers: [
		{
			label: "EMPLOYEE ID",
			key: "employeeId",
			cellType: "text",
		},
		{
			label: "EMPLOYEE",
			key: "name",
			cellType: "employee",
		},
		{
			label: "DEPARTMENT",
			key: "department",
			cellType: "text",
		},
		{
			label: "AMOUNT",
			key: "amount",
			cellType: "text",
		},
		{
			label: "PAYMENT DATE",
			key: "paymentDate",
			cellType: "text",
		},
		{
			label: "STATUS",
			key: "status",
			cellType: "status",
		},
	],

	rows: [],
};

export const employeeTableConfig: ReportTableConfig = {
	selectable: true,
	pagination: true,
	rowsPerPage: 10,
	actions: [
		{
			icon: Edit,
			action: "edit",
		},
		{
			icon: Trash2,
			action: "delete",
		},
	],
	headers: [
		{
			label: "EMPLOYEE ID",
			key: "employeeId",
			cellType: "text",
		},
		{
			label: "EMPLOYEE",
			key: "name",
			cellType: "employee",
		},
		{
			label: "DEPARTMENT",
			key: "department",
			cellType: "pill",
		},
		{
			label: "EMAIL",
			key: "email",
			cellType: "text",
		},
	],
	rows:[]
};