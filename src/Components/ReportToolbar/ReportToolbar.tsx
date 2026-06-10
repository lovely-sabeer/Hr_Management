import { useState } from "react";
import styles from "./ReportToolbar.module.css"
import { Search, Download, ChevronDown, } from "lucide-react";
import Dropdown from "../Dropdown/Dropdown";

type RtbToolbarProps = {
	config: {
		searchPlaceholder: string;
		exportLabel: string;
		dropdowns: {
			value: string;
			label: string;
		}[][];
	};
	searchValue: string;
	onSearchChange: (value: string) => void;
	onExport: () => void;
};

const ReportToolbar = ({
	config,
	searchValue,
	onSearchChange,
	onExport,
}: RtbToolbarProps) => {
	const [dropdownValues, setDropdownValues] = useState(
		config.dropdowns.map(item => item[0]?.value ?? "")
	);

	const updateDropdown = (
		index: number,
		value: string
	) => {
		setDropdownValues(prev =>
			prev.map((item, idx) =>
				idx === index ? value : item
			)
		);
	};

	return (
		<div className={styles.Rtb__toolbar}>
			<div className={styles.Rtb__toolbarLeft}>
				<div className={styles.Rtb__search}>
					<Search size={18} />
					<input
						value={searchValue}
						onChange={e =>
							onSearchChange(e.target.value)
						}
						placeholder={
							config.searchPlaceholder
						}
					/>
				</div>

				{config.dropdowns.map(
					(options, index) => (
						<Dropdown
							key={index}
							options={options}
							value={
								dropdownValues[index]
							}
							onChange={(value:any) =>
								updateDropdown(
									index,
									value
								)
							}
						/>
					)
				)}
			</div>

			<button className={styles.Rtb__exportButton} onClick={onExport}>
				<Download size={16} />
				<span>{config.exportLabel}</span>
			</button>
		</div>
	);
};

export default ReportToolbar;