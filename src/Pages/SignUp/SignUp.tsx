import styles from "./SignUp.module.css"
import InputField from '../../Components/InputField/InputField'
import { ArrowRight} from 'lucide-react'

function SignUp() {
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
				<InputField
					label="FULL NAME"
					name="fullName"
					value=""
					placeholder="John Doe"
					onChange={() => {}}
				/>

				<InputField
					label="EMAIL ADDRESS"
					name="email"
					value=""
					placeholder="admin@enterprise.com"
					onChange={() => {}}
				/>

				<div className={styles.Ar__passwordGrid}>
					<InputField
						label="PASSWORD"
						name="password"
						type="password"
						value=""
						placeholder="••••••••"
						onChange={() => {}}
					/>

					<InputField
						label="CONFIRM"
						name="confirmPassword"
						type="password"
						value=""
						placeholder="••••••••"
						onChange={() => {}}
					/>
				</div>

				<button className={styles.Ar__submitButton}>
					Register New HR
					<ArrowRight size={18} />
				</button>
			</div>

			<div className={styles.Ar__footer}>
				Already have an account?
				<button>Log in here</button>
			</div>
		</div>
	</div>
  )
}

export default SignUp