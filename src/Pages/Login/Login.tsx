import { ArrowRight} from "lucide-react";
import InputField from "../../Components/InputField/InputField";
import styles from "./Login.module.css";

const Login = () => {
	return (
		<div className={styles.Lg__container}>
			<div className={styles.Lg__card}>
				<div className={styles.Lg__header}>
					<h1>System Access</h1>
					<p>Enterprise Management Portal</p>
				</div>

				<div className={styles.Lg__form}>
					<InputField
						label="EMAIL ADDRESS"
						name="email"
						value=""
						placeholder="admin@enterprise.com"
						onChange={() => {}}
					/>

					<div>
						<div className={styles.Lg__passwordHeader}>
							<label>PASSWORD</label>

							<button
								type="button"
								className={styles.Lg__forgotButton}
							>
								Forgot?
							</button>
						</div>

						<InputField
							label=""
							name="password"
							type="password"
							value=""
							placeholder="••••••••"
							onChange={() => {}}
						/>
					</div>

					<button className={styles.Lg__loginButton}>
						<span>Login</span>
						<ArrowRight size={18} />
					</button>
				</div>

				<div className={styles.Lg__footer}>
					<span>New to the platform?</span>

					<button
						type="button"
						className={styles.Lg__registerButton}
					>
						Create Account
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;