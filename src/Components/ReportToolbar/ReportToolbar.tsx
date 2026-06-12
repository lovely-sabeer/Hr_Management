import styles from "./ReportToolbar.module.css";
import { Search, Download } from "lucide-react";
import Dropdown from "../Dropdown/Dropdown";

type DropdownOption = {
	value: string;
	label: string;
};

type RtbToolbarProps = {
	config: {
		searchPlaceholder: string;
		exportLabel: string;
		dropdowns: DropdownOption[][];
	};
	searchValue: string;
	dropdownValues: string[];
	setDropdownValues: React.Dispatch<React.SetStateAction<string[]>>;
	onSearchChange: (value: string) => void;
	onExport: () => void;
};

const ReportToolbar = ({
	config,
	searchValue,
	onSearchChange,
	onExport,
	dropdownValues,
	setDropdownValues
}: RtbToolbarProps) => {

	const updateDropdown = (index: number, value: string) => {
		setDropdownValues(prev => {
			const nextValues = [...prev];
			while (nextValues.length < config.dropdowns.length) {
				nextValues.push("");
			}
			nextValues[index] = value;
			return nextValues;
		});
	};
	return (
		<div className={styles.Rtb__toolbar}>
			<div className={styles.Rtb__toolbarLeft}>
				<div className={styles.Rtb__search}>
					<Search size={18} />
					<input
						value={searchValue}
						onChange={e => onSearchChange(e.target.value)}
						placeholder={config.searchPlaceholder}
					/>
				</div>

				{config.dropdowns.map((options, index) => (
					<Dropdown
						key={index}
						options={options}
						value={dropdownValues[index] || ""}
						onChange={(value: string) => updateDropdown(index, value)}
					/>
				))}
			</div>

			<button className={styles.Rtb__exportButton} onClick={onExport}>
				<Download size={16} />
				<span>{config.exportLabel}</span>
			</button>
		</div>
	);
};

export default ReportToolbar;
