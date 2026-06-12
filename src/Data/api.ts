import axios from "axios";

export const Base_Url =
	"https://localhost:7205/api";

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
	instance.get("employee/export", { params: queryParams, responseType: "blob", });

export const deleteEmployees = (body: any) =>
	instance.post("employee/delete", body);

export const createEmployee = (body: any) =>
	instance.post("employee/create", body);


export default instance;