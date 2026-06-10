import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import AalSidebar from "../Sidebar/Sidebar";
import AalTopbar from "../Topbar/Topbar";

export default function AppLayout(){
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className={styles.Aal__container}>
            <AalSidebar
                collapsed={collapsed}
                isMobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                onToggleCollapse={() => setCollapsed((prev) => !prev)}
            />
            <div className={`${styles.Aal__contentWrapper}`}>
                <AalTopbar title="Dashboard" onMenuClick={() => setMobileOpen(true)}/>
                <main className={styles.Aal__content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
