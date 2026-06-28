import "./App.css";
import { WebLayout, AppLayout, PublicRoute, ProtectedRoute } from "./Components/AppLayout/AppLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";

import Dashboard from "./Pages/Dashboard/Dashboard";
import AttendanceManagement from "./Pages/AttendanceManagement/AttendanceManagement";
import SalaryManagement from "./Pages/SalaryManagement/SalaryManagement";
import EmployeeList from "./Pages/EmployeeList/EmployeeList";
// import AddNewEmployee from "./Pages/AddNewEmployee/AddNewEmployee";

import { Analytics } from '@vercel/analytics/react';

function App() {
	return (
		<BrowserRouter>
			<Analytics />
			<Routes>
				{/* Public Routes */}
				<Route element={<PublicRoute />}>
					<Route element={<WebLayout />}>
						<Route path="/" element={<Navigate to="/login" replace />}/>
						<Route path="/login" element={<Login />}/>
						<Route path="/signup" element={<SignUp />}/>
					</Route>
				</Route>

				{/* Protected Routes */}
				<Route element={<ProtectedRoute />}>
					<Route element={<AppLayout />}>
						<Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
						<Route path="/app/dashboard" element={<Dashboard />} />
						<Route path="/app/employees" element={<EmployeeList />} />
						<Route path="/app/attendance" element={<AttendanceManagement />} />
						<Route path="/app/salary" element={<SalaryManagement />} />
						{/* <Route path="/app/add-employee" element={<AddNewEmployee />} /> */}
					</Route>
				</Route>

			</Routes>
		</BrowserRouter>
	);
}

export default App;