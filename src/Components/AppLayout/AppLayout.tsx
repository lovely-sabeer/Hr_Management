import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import AalSidebar from "../Sidebar/Sidebar";
import AalTopbar from "../Topbar/Topbar";

export function AppLayout() {
	const [collapsed, setCollapsed] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<div className={styles.Aal__container}>
			<AalSidebar
				collapsed={collapsed}
				isMobileOpen={mobileOpen}
				onClose={() => setMobileOpen(false)}
				onToggleCollapse={() =>
					setCollapsed((prev) => !prev)
				}
			/>

			<div className={styles.Aal__contentWrapper}>
				<AalTopbar
					title="Dashboard"
					onMenuClick={() => setMobileOpen(true)}
				/>

				<main className={styles.Aal__content}>
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export function WebLayout() {
	return (
		<div className={styles.Aal__container}>
			<div className={styles.Aal__contentWrapper}>
				<main className={styles.Aal__content}>
					<Outlet />
				</main>
			</div>
		</div>
	);
}


export function ProtectedRoute() {
	const token = localStorage.getItem("userLogin");

	return token
		? <Outlet />
		: <Navigate to="/login" replace />;
}

export function PublicRoute() {
	const token = localStorage.getItem("userLogin");

	return token
		? <Navigate to="/app" replace />
		: <Outlet />;
}
