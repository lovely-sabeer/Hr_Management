import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./Components/AppLayout/AppLayout";
import AttendanceManagement from "./Pages/AttendanceManagement/AttendanceManagement";
import SalaryManagement from "./Pages/SalaryManagement/SalaryManagement";
import EmployeeList from "./Pages/EmployeeList/EmployeeList";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddNewEmployee from "./Pages/AddNewEmployee/AddNewEmployee";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    {/* <Route path="/" element={<WebLayout />}>
							<Route index element={<Navigate to="web" replace />} />
							<Route path="web" element={<LandingPage />} />
							<Route path="login" element={<Login />} />
							<Route path="signup" element={<Signup />} />
							<Route path="forgot-password" element={<ForgotPassword />} />
						</Route> 
					*/}
                    <Route path="/app" element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate to="dashboard" replace />}
                        />
                        {/* <Route path="dashboard" element={<AttendanceManagement />} /> */}
                        {/* <Route path="dashboard" element={<SalaryManagement />} /> */}
                        {/* <Route path="dashboard" element={<EmployeeList />} /> */}
                        {/* <Route path="dashboard" element={<Dashboard />} /> */}
                        {/* <Route path="dashboard" element={<AddNewEmployee />} /> */}
                        {/* <Route path="dashboard" element={<SignUp />} /> */}
                        <Route path="dashboard" element={<Login />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
