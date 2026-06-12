import React, { useState, useEffect, type JSX } from "react";
import { X } from "lucide-react";
import styles from "./AddNewEmployee.module.css";
import InputField from "../../Components/InputField/InputField";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { createEmployee } from "../../Data/api";

interface EmployeeFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	gender: string;
	dob: string;
	department: string;
	salary: string;
	joiningDate: string;
}

interface EmployeeErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	gender?: string;
	dob?: string;
	department?: string;
	salary?: string;
	joiningDate?: string;
}

interface AddNewEmployeeProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	forUpdate?: boolean | null;
	initialData?: Partial<EmployeeFormData> | null;
	onRefresh?: () => void;
}

export default function AddNewEmployee({ 
	isOpen, 
	setIsOpen, 
	forUpdate = null,
	initialData = null,
	onRefresh
}: AddNewEmployeeProps): JSX.Element {
	
	if (!isOpen) return <></>;

	const isViewOnly = forUpdate === false;
	const isUpdateMode = forUpdate === true;
	const isCreateMode = forUpdate === null;

	const [formData, setFormData] = useState<EmployeeFormData>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		gender: "male",
		dob: "",
		department: "Engineering",
		salary: "",
		joiningDate: "",
	});

	const [errors, setErrors] = useState<EmployeeErrors>({});

	useEffect(() => {
		if ((isUpdateMode || isViewOnly) && initialData) {
			setFormData(prev => ({
				...prev,
				...initialData,
				salary: initialData.salary?.toString() || ""
			}));
		} else if (isCreateMode) {
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				gender: "male",
				dob: "",
				department: "Engineering",
				salary: "",
				joiningDate: "",
			});
		}
		setErrors({});
	}, [isOpen, forUpdate, initialData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (isViewOnly) return;
		const { name, value } = e.target;

		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const handleDropdownChange = (field: keyof EmployeeFormData, value: string): void => {
		if (isViewOnly) return;
		setFormData((prev) => ({ ...prev, [field]: value }));
		setErrors((prev) => ({ ...prev, [field]: "" }));
	};

	const handleSubmit = async (): Promise<void> => {
		if (isViewOnly) {
			setIsOpen(false);
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^[0-9]{10,15}$/;
		const newErrors: EmployeeErrors = {};

		if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
		if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
		
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}

		if (!formData.phone.trim()) {
			newErrors.phone = "Phone number is required";
		} else if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
			newErrors.phone = "Please enter a valid phone number";
		}

		if (!formData.gender) newErrors.gender = "Gender is required";
		if (!formData.dob) newErrors.dob = "Date of birth is required";
		if (!formData.department) newErrors.department = "Department is required";
		if (!formData.salary) newErrors.salary = "Salary is required";
		if (!formData.joiningDate) newErrors.joiningDate = "Joining date is required";

		setErrors(newErrors);
		if (Object.keys(newErrors).length > 0) return;

		try {
			const collectedData = {
				...formData,
				salary: Number(formData.salary),
			};

			if (isCreateMode) {
				const result = await createEmployee(collectedData);
				if (result.data.success) {
					onRefresh?.();
					setIsOpen(false);
				}
			} else if (isUpdateMode) {
				console.log("Execute update API request with:", collectedData);
				onRefresh?.();
				setIsOpen(false);
			}
		} catch (error) {
			console.error("Form Submission Error:", error);
		}
	};

	return (
		<div className={styles.Aem__overlay}>
			<div className={styles.Aem__modal}>
				<div className={styles.Aem__header}>
					<div>
						<h2>
							{isCreateMode && "Add New Employee"}
							{isUpdateMode && "Update Employee Details"}
							{isViewOnly && "Employee Information View"}
						</h2>
						<p>
							{isCreateMode && "Fill in the details to register a new staff member."}
							{isUpdateMode && "Modify fields below to update staff registry data."}
							{isViewOnly && "Read-only access mode for selected user file records."}
						</p>
					</div>

					<button className={styles.Aem__closeButton} onClick={() => setIsOpen(false)}>
						<X size={18} />
					</button>
				</div>

				<div className={styles.Aem__body}>
					<div className={styles.Aem__grid}>
						<div>
							<InputField
								label="First Name"
								name="firstName"
								value={formData.firstName}
								placeholder="e.g. Alexander"
								onChange={handleChange}
								disabled={isViewOnly}
							/>
							{errors.firstName && <p className={styles.AemError}>{errors.firstName}</p>}
						</div>

						<div>
							<InputField
								label="Last Name"
								name="lastName"
								value={formData.lastName}
								placeholder="e.g. Pierce"
								onChange={handleChange}
								disabled={isViewOnly}
							/>
							{errors.lastName && <p className={styles.AemError}>{errors.lastName}</p>}
						</div>

						<div>
							<InputField
								label="Email Address"
								name="email"
								type="email"
								value={formData.email}
								placeholder="a.pierce@company.com"
								onChange={handleChange}
								disabled={isViewOnly}
							/>
							{errors.email && <p className={styles.AemError}>{errors.email}</p>}
						</div>

						<div>
							<InputField
								label="Phone Number"
								name="phone"
								value={formData.phone}
								placeholder="+1 (555) 000-0000"
								onChange={handleChange}
								disabled={isViewOnly}
							/>
							{errors.phone && <p className={styles.AemError}>{errors.phone}</p>}
						</div>

						<div>
							<Dropdown
								value={formData.gender}
								options={[
									{ value: "male", label: "Male" },
									{ value: "female", label: "Female" },
									{ value: "other", label: "Other" },
								]}
								onChange={(value: string) => handleDropdownChange("gender", value)}
								disabled={isViewOnly}
							/>
							{errors.gender && <p className={styles.AemError}>{errors.gender}</p>}
						</div>

						<div>
							<InputField
								label="Date of Birth"
								name="dob"
								type="date"
								value={formData.dob}
								onChange={handleChange}
								disabled={isViewOnly}
							/>
							{errors.dob && <p className={styles.AemError}>{errors.dob}</p>}
						</div>

						<div>
							<Dropdown
								value={formData.department}
								options={[
									{ value: "Engineering", label: "Engineering" },
									{ value: "Design", label: "Design" },
									{ value: "Marketing", label: "Marketing" },
								]}
								onChange={(value: string) => handleDropdownChange("department", value)}
								disabled={isViewOnly}
							/>
							{errors.department && <p className={styles.AemError}>{errors.department}</p>}
						</div>

						<div>
							<InputField
								label="Monthly Salary ($)"
								name="salary"
								type="number"
								value={formData.salary}
								placeholder="0.00"
								onChange={handleChange}
								disabled={isViewOnly}
							/>
							{errors.salary && <p className={styles.AemError}>{errors.salary}</p>}
						</div>

						<div className={styles.Aem__fullWidth}>
							<InputField
								label="Joining Date"
								name="joiningDate"
								type="date"
								value={formData.joiningDate}
								onChange={handleChange}
								disabled={isViewOnly}
							/>
							{errors.joiningDate && <p className={styles.AemError}>{errors.joiningDate}</p>}
						</div>
					</div>
				</div>

				<div className={styles.Aem__footer}>
					{!isViewOnly && (
						<button className={styles.Aem__cancelButton} onClick={() => setIsOpen(false)}>
							Cancel
						</button>
					)}

					<button className={styles.Aem__saveButton} onClick={handleSubmit}>
						{isCreateMode && "Save Employee"}
						{isUpdateMode && "Update"}
						{isViewOnly && "Close"}
					</button>
				</div>
			</div>
		</div>
	);
}
