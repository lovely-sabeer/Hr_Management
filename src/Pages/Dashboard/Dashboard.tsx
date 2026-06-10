import styles from "./Dashboard.module.css"
import { employeeStats } from '../../Data/Data'
import StatCard from '../../Components/StatCard/StatCard'
import ReactApexChart from 'react-apexcharts'
function Dashboard() {
	const employeeGrowthChart = {
		options: {
			chart: {
				toolbar: {
					show: false,
				},
				background: "transparent",
			},
			stroke: {
				curve: "smooth" as const,
				width: 4,
			},
			grid: {
				borderColor: "#2A2A3A",
			},
			xaxis: {
				categories: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				],
			},
			legend: {
				labels: {
					colors: "#B4B4C7",
				},
			},
		},
		series: [
			{
				name: "Recruitment",
				data: [80, 95, 110, 125, 145, 155, 170, 180, 195, 210, 225, 240],
			},
			{
				name: "Resignation",
				data: [25, 28, 30, 32, 38, 40, 36, 42, 45, 48, 50, 55],
			},
		],
	};
	const departmentChart = {
		options: {
			labels: [
				"Engineering",
				"Sales & Marketing",
				"Product Design",
				"Human Resources",
			],
			legend: {
				position: "bottom" as const,
				labels: {
					colors: "#B4B4C7",
				},
			},
		},
		series: [35, 20, 25, 20],
	};
  	return (
		<div className={styles.El__container}>
			<div className={styles.El__statGrid}>
				{employeeStats.map(card => (
					<StatCard
						key={card.id}
						card={card}
					/>
				))}
			</div>

			<div className={styles.El__analyticsGrid}>
				<div className={styles.El__chartCard}>
					<div className={styles.El__chartHeader}>
						<div>
							<h3>Recruitment Trends</h3>
							<p>
								Employee growth vs resignation
								across 12 months
							</p>
						</div>
					</div>

					<ReactApexChart
						options={employeeGrowthChart.options}
						series={employeeGrowthChart.series}
						type="area"
						height={320}
					/>
				</div>

				<div className={styles.El__chartCard}>
					<div className={styles.El__chartHeader}>
						<div>
							<h3>Department Hub</h3>
							<p>Headcount distribution</p>
						</div>
					</div>

					<ReactApexChart
						options={departmentChart.options}
						series={departmentChart.series}
						type="donut"
						height={320}
					/>
				</div>
			</div>
		</div>
  	)
}

export default Dashboard