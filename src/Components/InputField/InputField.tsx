import styles from "./InputField.module.css";

type InputFieldProps = {
	label: string;
	name: string;
	type?: string;
	value: string | number;
	placeholder?: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement>
	) => void;
	required?: boolean;
	disabled?: boolean;
};

const InputField = ({
	label,
	name,
	type = "text",
	value,
	placeholder,
	onChange,
	required = false,
	disabled = false,
}: InputFieldProps) => {
	return (
		<div className={styles.If__field}>
			<label
				htmlFor={name}
				className={styles.If__label}>
				{label}
			</label>

			<input
				id={name}
				name={name}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				required={required}
				disabled={disabled}
				className={styles.If__input}
			/>
		</div>
	);
};

export default InputField;