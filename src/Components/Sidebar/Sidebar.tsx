import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css"
import { CalendarClock, CalendarDays, FileText, LayoutDashboard, LogOut, Settings, Users, Wallet } from "lucide-react";


const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { id: "employees", label: "Employees", icon: Users, path: "/employees" },
    { id: "attendance", label: "Attendance", icon: CalendarDays, path: "/attendance", },
    { id: "leave", label: "Leave", icon: CalendarClock, path: "/leave" },
    { id: "salary", label: "Salary", icon: Wallet, path: "/salary" },
    { id: "reports", label: "Reports", icon: FileText, path: "/reports" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

type AalSidebarItemProps = {
    label: string;
    path: string;
    icon: React.ElementType;
    collapsed: boolean;
};

const AalSidebarItem = ({
    label,
    path,
    icon: Icon,
    collapsed,
}: AalSidebarItemProps) => (
    <NavLink
        to={path}
        className={({ isActive }) =>
            `${styles.Aal__navItem} ${isActive ? styles.Aal__navItemActive : ""}`
        }
    >
        <Icon size={16} />
        {!collapsed && <span>{label}</span>}
    </NavLink>
);

type AalSidebarProps = {
    collapsed: boolean;
    isMobileOpen: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
};

const AalSidebar = ({
    collapsed,
    isMobileOpen,
    onClose,
}: AalSidebarProps) => (
    <>
        <div className={`${styles.Aal__overlay} ${isMobileOpen ? styles.Aal__overlayShow : ""}`} onClick={onClose} />
        <aside className={`${styles.Aal__sidebar} ${collapsed ? styles.Aal__sidebarCollapsed : ""} ${isMobileOpen ? styles.Aal__sidebarMobileOpen : ""}`}>
            <div className={styles.Aal__brand}>
				<h2>Nexus HR</h2>
			</div>
            <nav className={styles.Aal__nav}>
                {navigationItems.map((item) => (
                    <AalSidebarItem
                        key={item.id}
                        {...item}
                        collapsed={collapsed}
                    />
                ))}
            </nav>

            <div className={styles.Aal__brand}>
                <button className={styles.Aal__logoutBtn}>
                    <LogOut size={18} />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    </>
);

export default AalSidebar;