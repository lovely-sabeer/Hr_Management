import axios from "axios";

export const Base_Url =
	"https://hr-management-server-5q1i.onrender.com/api";

const instance = axios.create({
	baseURL: Base_Url,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("authToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export const login = (credentials: any) =>
	instance.post("auth/login", credentials);

export const signUp = (credentials: any) =>
	instance.post("auth/register", credentials);

export const getEmployeeList = (queryParams: any) =>
	instance.get("employee/list", { params: queryParams });

export const exportEmployee = (queryParams: any) =>
	instance.get("employee/export", { params: queryParams });

export const deleteEmployees = (body: any) =>
	instance.post("employee/delete", body);

export const createEmployee = (body: any) =>
	instance.post("employee/create", body);

export const getEmployeeById = (id: any) =>
	instance.get(`employee/get-by-id/${id}`);

export const updateEmployee = ({id, body}: any) =>
	instance.post(`employee/update/${id}`, body);

export const markAttendance = (body: any) =>
	instance.post("attendance/bulk-update", body);

export const getAttendanceList = (body: any) =>
	instance.post("attendance/list", body );

export const exportAttendance = (body: any) =>
	instance.post("attendance/export", body );

export const getAttendanceStat = () =>
	instance.get("attendance/stat-cards" );

export const getSalaryList = (queryParams: any)  =>
	instance.get("salary/list", { params: queryParams } );

export const exportSalary = (queryParams: any)  =>
	instance.get("salary/export", { params: queryParams });

export const paySalary = (body: any)  =>
	instance.post("salary/pay", body);


export default instance;