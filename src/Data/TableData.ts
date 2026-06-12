import { Edit, Trash2 } from "lucide-react";
import type { ReportTableConfig } from "../Components/ReportTable/ReportTable";
import { getEmployeeList } from "./api";

export const attendanceTableConfig: ReportTableConfig  = {
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
		{ label: "EMPLOYEE ID", key: "employeeId", cellType: "text", },
		{ label: "EMPLOYEE", key: "name", cellType: "employee", },
		{ label: "DEPARTMENT", key: "department", cellType: "text", },
		{ label: "DATE", key: "date", cellType: "text", },
		{ label: "STATUS", key: "status", cellType: "status", },
	],

	rows: [
		{
			id: 1,
			employeeId: "EMP-1001",
			name: "Alex Rivers",
			email: "alex@nexus.com",
			// avatar: "https://i.pravatar.cc/150?img=11",
			department: "Engineering",
			date: "10-Jun-2026",
			status: "Present",
		},
		{
			id: 2,
			employeeId: "EMP-1002",
			name: "Sarah Chen",
			email: "sarah@nexus.com",
			// avatar: "https://i.pravatar.cc/150?img=12",
			department: "Design",
			date: "10-Jun-2026",
			status: "Absent",
		},
		{
			id: 3,
			employeeId: "EMP-1001",
			name: "Alex Rivers",
			email: "alex@nexus.com",
			// avatar: "https://i.pravatar.cc/150?img=11",
			department: "Engineering",
			date: "10-Jun-2026",
			status: "Present",
		},
		{
			id: 4,
			employeeId: "EMP-1002",
			name: "Sarah Chen",
			email: "sarah@nexus.com",
			// avatar: "https://i.pravatar.cc/150?img=12",
			department: "Design",
			date: "10-Jun-2026",
			status: "Absent",
		},
	],
};

export const salaryTableConfig: ReportTableConfig = {
	selectable: true,

	pagination: true,

	rowsPerPage: 10,

	actions: [
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

	rows: [
		{
			id: 1,
			employeeId: "EMP-00124",
			name: "Jordan Ashworth",
			email: "jordan@company.com",
			department: "Engineering",
			amount: "$8,450.00",
			paymentDate: "24-Oct-2023",
			status: "Paid",
		},
		{
			id: 2,
			employeeId: "EMP-00125",
			name: "Sarah Kovach",
			email: "sarah@company.com",
			department: "Marketing",
			amount: "$6,200.00",
			paymentDate: "24-Oct-2023",
			status: "Paid",
		},
		{
			id: 3,
			employeeId: "EMP-00128",
			name: "Marcus Reeves",
			email: "marcus@company.com",
			department: "Operations",
			amount: "$5,900.00",
			paymentDate: "-",
			status: "Unpaid",
		},
		{
			id: 4,
			employeeId: "EMP-00130",
			name: "Helen Lin",
			email: "helen@company.com",
			department: "Design",
			amount: "$7,150.00",
			paymentDate: "22-Oct-2023",
			status: "Paid",
		},
		{
			id: 5,
			employeeId: "EMP-00132",
			name: "Ben Thompson",
			email: "ben@company.com",
			department: "Engineering",
			amount: "$9,200.00",
			paymentDate: "-",
			status: "Unpaid",
		},
	],
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
	// 	async () => {
	// 	const result = await getEmployeeList({ status:"", page:"", pageSize:1, search:10 });
	// 	return (result.data?.data || []).map((employee: any) => ({
	// 		"id": employee.id,
	// 		"name": employee.fullName,
	// 		"role": employee.roleName,
	// 		"status": employee.status,
	// 	}));
	// }
	// 	[
	// 	{
	// 		id: 1,
	// 		employeeId: "#EMP-2041",
	// 		name: "Sarah Miller",
	// 		email: "sarah.m@company.com",
	// 		department: "Engineering",
	// 	},
	// 	{
	// 		id: 2,
	// 		employeeId: "#EMP-2042",
	// 		name: "James Wilson",
	// 		email: "james.w@company.com",
	// 		department: "Design",
	// 	},
	// 	{
	// 		id: 3,
	// 		employeeId: "#EMP-2043",
	// 		name: "Anita Kumar",
	// 		email: "anita.k@company.com",
	// 		department: "Marketing",
	// 	},
	// 	{
	// 		id: 4,
	// 		employeeId: "#EMP-2044",
	// 		name: "Robert Lee",
	// 		email: "robert.l@company.com",
	// 		department: "Engineering",
	// 	},
	// 	{
	// 		id: 5,
	// 		employeeId: "#EMP-2045",
	// 		name: "Emily Watson",
	// 		email: "emily.w@company.com",
	// 		department: "HR",
	// 	},
	// 	{
	// 		id: 6,
	// 		employeeId: "#EMP-2046",
	// 		name: "Michael Brown",
	// 		email: "michael.b@company.com",
	// 		department: "Finance",
	// 	},
	// 	{
	// 		id: 7,
	// 		employeeId: "#EMP-2047",
	// 		name: "Sophia Davis",
	// 		email: "sophia.d@company.com",
	// 		department: "Engineering",
	// 	},
	// 	{
	// 		id: 8,
	// 		employeeId: "#EMP-2048",
	// 		name: "Daniel Garcia",
	// 		email: "daniel.g@company.com",
	// 		department: "Marketing",
	// 	},
	// ],
};