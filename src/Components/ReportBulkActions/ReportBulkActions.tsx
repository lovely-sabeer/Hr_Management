import type { LucideIcon } from "lucide-react";
import styles from "./ReportBulkActions.module.css"

type Button = {
  	name: string;
	icon: LucideIcon; 
	handleClick: ()=>void
};
const ReportBulkActions = ({ selectedCount, buttons }: { selectedCount: number, buttons: Button[] }) => {
	if (!selectedCount) return null;
	return (
		<div className={styles.Atm__bulkActions}>
			<span>{selectedCount} Selected</span>
			<div className={styles.Atm__bulkButtons}>
				{
					buttons.map((item: Button, index: number) => {
						const Icon = item.icon;
						return (
							<button key={index} onClick={()=>item.handleClick()}>
								<Icon size={14} />
								{item.name}
							</button>
						)
					})
				}
			</div>
		</div>
	);
};
export default ReportBulkActions;