import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import InputField from "../../Components/InputField/InputField";
import styles from "./SignUp.module.css";
import { signUp } from "../../Data/api";

function SignUp() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e:any) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		setErrors((prev) => ({
			...prev,
			[name]: "",
		}));
	};
	const handleSubmit = () => {
		const emailRegex =
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

		const newErrors = {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		};

		if (!formData.fullName.trim()) {
			newErrors.fullName = "Full name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email =
				"Please enter a valid email address";
		}

		if (!formData.password.trim()) {
			newErrors.password = "Password is required";
		} else if (!passwordRegex.test(formData.password)) {
			newErrors.password =
				"Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number";
		}

		if (!formData.confirmPassword.trim()) {
			newErrors.confirmPassword =
				"Please confirm your password";
		} else if (
			formData.password !== formData.confirmPassword
		) {
			newErrors.confirmPassword =
				"Passwords do not match";
		}

		setErrors(newErrors);

		if (
			newErrors.fullName ||
			newErrors.email ||
			newErrors.password ||
			newErrors.confirmPassword
		) {
			return;
		}
		signUp({
			fullName: formData.fullName,
			email: formData.email,
			password: formData.password,
		}).then((res) => {
			if (res.data == true) {
				localStorage.setItem(
					"userRegistration",
					JSON.stringify({
						fullName: formData.fullName,
						email: formData.email,
						password: formData.password,
					})
				);
				navigate("/login");
			}
		}).catch((err)=>console.log(err))
		
	};

	return (
		<div className={styles.Ar__container}>
			<div className={styles.Ar__card}>
				<div className={styles.Ar__header}>
					<h1>Admin Registration</h1>

					<p>
						Create your HR administrator account to get
						started.
					</p>
				</div>

				<div className={styles.Ar__form}>
					<div>
						<InputField
							label="FULL NAME"
							name="fullName"
							value={formData.fullName}
							placeholder="John Doe"
							onChange={handleChange}
						/>

						{errors.fullName && (
							<p className={styles.ArError}>
								{errors.fullName}
							</p>
						)}
					</div>

					<div>
						<InputField
							label="EMAIL ADDRESS"
							name="email"
							value={formData.email}
							placeholder="admin@enterprise.com"
							onChange={handleChange}
						/>

						{errors.email && (
							<p className={styles.ArError}>
								{errors.email}
							</p>
						)}
					</div>

					<div className={styles.Ar__passwordGrid}>
						<div>
							<InputField
								label="PASSWORD"
								name="password"
								type="password"
								value={formData.password}
								placeholder="••••••••"
								onChange={handleChange}
							/>

							{errors.password && (
								<p className={styles.ArError}>
									{errors.password}
								</p>
							)}
						</div>

						<div>
							<InputField
								label="CONFIRM"
								name="confirmPassword"
								type="password"
								value={formData.confirmPassword}
								placeholder="••••••••"
								onChange={handleChange}
							/>

							{errors.confirmPassword && (
								<p className={styles.ArError}>
									{errors.confirmPassword}
								</p>
							)}
						</div>
					</div>

					<button
						type="button"
						className={styles.Ar__submitButton}
						onClick={handleSubmit}
					>
						Register New HR
						<ArrowRight size={18} />
					</button>
				</div>

				<div className={styles.Ar__footer}>
					Already have an account?
					<button type="button" onClick={()=>navigate("/login")}>
						Log in here
					</button>
				</div>
			</div>
		</div>
	);
}

export default SignUp;