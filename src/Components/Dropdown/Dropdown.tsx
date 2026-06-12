import { useState } from "react";
import styles from "./Dropdown.module.css";
import { ChevronDown } from "lucide-react";

type RtbDropdownOption = {
	value: string;
	label: string;
};

type RtbDropdownProps = {
	options: RtbDropdownOption[];
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
};

const Dropdown = ({
	options,
	value,
	onChange,
	disabled = false
}: RtbDropdownProps) => {
	const [open, setOpen] = useState(false);

	const selected =
		options.find(item => item.value === value) ??
		options[0];

	return (
		<div className={`${styles.Rtb__dropdown} ${disabled ? styles.Rtb__dropdownDisabled : ""}`}>
			<button 
				className={styles.Rtb__dropdownTrigger} 
				onClick={() => !disabled && setOpen(prev => !prev)} 
				type="button"
				disabled={disabled}
			>
				<span>{selected?.label || ""}</span>
				<ChevronDown size={16} />
			</button>

			{open && !disabled && (
				<div className={styles.Rtb__dropdownMenu}>
					{options.map(option => (
						<div
							key={option.value}
							className={`${styles.Rtb__dropdownItem} ${
								option.value === value
									? styles.Rtb__dropdownItemActive
									: ""
							}`}
							onClick={() => {
								onChange(option.value);
								setOpen(false);
							}}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
