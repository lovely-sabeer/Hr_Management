import { useState } from "react";
import { ArrowRight } from "lucide-react";
import InputField from "../../Components/InputField/InputField";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../Data/api";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();
	const [successMessage, setSuccessMessage] = useState("");

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

		setSuccessMessage("");
	};

	const handleSubmit = async () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
		const newErrors = { email: "", password: "",};
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
		setErrors(newErrors);
		if (newErrors.email || newErrors.password) return;
		setFormData({ email: "", password: "", });
		const response = await login(formData);
		if (response.data.email === formData.email) {
			localStorage.setItem( "userLogin", JSON.stringify(formData));
			setSuccessMessage("Login data saved successfully.");
			localStorage.setItem( "authToken", response.data.token );
			navigate("/app");
		} else {
			setSuccessMessage("Invalid Username or password");
		}
	};

	return (
		<div className={styles.Lg__container}>
			<div className={styles.Lg__card}>
				<div className={styles.Lg__header}>
					<h1>System Access</h1>
					<p>Enterprise Management Portal</p>
				</div>

				<div className={styles.Lg__form}>
					<div>
						<InputField
							label="EMAIL ADDRESS"
							name="email"
							value={formData.email}
							placeholder="admin@enterprise.com"
							onChange={handleChange}
						/>

						{errors.email && (
							<p className={styles.LgError}>
								{errors.email}
							</p>
						)}
					</div>

					<div>

						<InputField
							label=""
							name="password"
							type="password"
							value={formData.password}
							placeholder="••••••••"
							onChange={handleChange}
						/>

						{errors.password && (
							<p className={styles.LgError}>
								{errors.password}
							</p>
						)}
					</div>

					<button
						type="button"
						className={styles.Lg__loginButton}
						onClick={handleSubmit}
					>
						<span>Login</span>
						<ArrowRight size={18} />
					</button>

					{successMessage && (
						<p className={styles.LgSuccess}>
							{successMessage}
						</p>
					)}
				</div>

				<div className={styles.Lg__footer}>
					<span>New to the platform?</span>
					<button type="button" className={styles.Lg__registerButton} onClick={()=> navigate("/signup")}>
						Create Account
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;