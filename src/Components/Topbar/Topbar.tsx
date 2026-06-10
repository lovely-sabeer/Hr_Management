import { Bell, Menu } from "lucide-react";
import styles from "./Topbar.module.css"

const profileData = {
    name: "Admin User",
    role: "HR Department",
    plan: "Premium Tier",
    image: "https://i.pravatar.cc/150?img=12",
};

type AalTopbarProps = {
    title: string;
    onMenuClick: () => void;
};

const AalTopbar = ({ title, onMenuClick }: AalTopbarProps) => (
    <header className={styles.Aal__topbar}>
        <div className={styles.Aal__topbarLeft}>
            <button className={styles.Aal__menuBtn} onClick={onMenuClick}>
                <Menu size={22} />
            </button>
            <h1>{title}</h1>
        </div>

        <div className={styles.Aal__topbarRight}>
            <div className={styles.Aal__user}>
                <img src={profileData.image} alt={profileData.name} />
                <div>
                    <h4>{profileData.name}</h4>
                    <p>{profileData.role}</p>
                </div>
            </div>
        </div>
    </header>
);

export default AalTopbar;