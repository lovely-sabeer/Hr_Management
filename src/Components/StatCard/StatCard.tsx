import styles from "./StatCard.module.css"

export default function StatCard({ card }: any) {
	const Icon = card.icon;
	return (
		<div key={card.id} className={styles.Atm__statCard}>
			<div className={styles.Atm__statGlow} />

			<div className={styles.Atm__statHeader}>
				<div className={styles.Atm__statIcon}>
					<Icon size={20} />
				</div>

				<span
					className={`${styles.Atm__statBadge} ${styles[`Atm__badge${card.changeType}`]}`}
				>
					{card.change}
				</span>
			</div>

			<div className={styles.Atm__statBody}>
				<p>{card.title}</p>
				<h3>{card.value}</h3>
			</div>
		</div>
	);
}