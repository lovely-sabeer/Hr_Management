import { X } from "lucide-react"
import styles from "./AddNewEmployee.module.css"
import InputField from "../../Components/InputField/InputField"
import Dropdown from "../../Components/Dropdown/Dropdown"

function AddNewEmployee() {
  return (
	<div className={styles.Aem__overlay}>
		<div className={styles.Aem__modal}>
			<div className={styles.Aem__header}>
				<div>
					<h2>Add New Employee</h2>
					<p>Fill in the details to register a new staff member.</p>
				</div>

				<button className={styles.Aem__closeButton}>
					<X size={18} />
				</button>
			</div>

			<div className={styles.Aem__body}>
				<div className={styles.Aem__grid}>
					<InputField
						label="First Name"
						name="firstName"
						value=""
						placeholder="e.g. Alexander"
						onChange={() => {}}
					/>

					<InputField
						label="Last Name"
						name="lastName"
						value=""
						placeholder="e.g. Pierce"
						onChange={() => {}}
					/>

					<InputField
						label="Email Address"
						name="email"
						type="email"
						value=""
						placeholder="a.pierce@company.com"
						onChange={() => {}}
					/>

					<InputField
						label="Phone Number"
						name="phone"
						value=""
						placeholder="+1 (555) 000-0000"
						onChange={() => {}}
					/>

					<Dropdown
						value="Gender"
						options={[
							{ value: "male", label: "Male" },
							{ value: "female", label: "Female" },
							{ value: "other", label: "Other" },
						  ]}
						  onChange={()=>{}}
					/>

					<InputField
						label="Date of Birth"
						name="dob"
						type="date"
						value=""
						onChange={() => {}}
					/>

					<Dropdown
						value="Department"
						options={[
							{
								value: "engineering",
								label: "Engineering",
							},
							{
								value: "hr",
								label: "Human Resources",
							},
							{
								value: "marketing",
								label: "Marketing",
							},
						  ]}
						  onChange={() => { }}
					/>

					<InputField
						label="Monthly Salary ($)"
						name="salary"
						type="number"
						value=""
						placeholder="0.00"
						onChange={() => {}}
					/>

					<div className={styles.Aem__fullWidth}>
						<InputField
							label="Joining Date"
							name="joiningDate"
							type="date"
							value=""
							onChange={() => {}}
						/>
					</div>
				</div>
			</div>

			<div className={styles.Aem__footer}>
				<button className={styles.Aem__cancelButton}>
					Cancel
				</button>

				<button className={styles.Aem__saveButton}>
					Save Employee
				</button>
			</div>
		</div>
	</div>
  )
}

export default AddNewEmployee