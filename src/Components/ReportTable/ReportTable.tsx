import styles from "./ReportTable.module.css";

export type ReportTableCellType =
	| "text"
	| "employee"
	| "status"
	| "pill"
	| "toggle"
	| "envChips"
	| "evals"
	| "responsePill"
	| "flagPill";

export type ReportTableHeader = {
	label: string;
	key: string;
	cellType?: ReportTableCellType;
};

export type ReportTableAction = {
	icon: React.ElementType;
	action: string;
};

export type ReportTableConfig = {
	headers: ReportTableHeader[];
	rows: Record<string, any>[];
	pagination?: boolean;
	rowsPerPage?: number;
	selectable?: boolean;
	actions?: ReportTableAction[];
};

type ReportTableProps = {
	config: ReportTableConfig;
	selectedRows?: number[];
	onSelectRow?: (id: number) => void;
	onSelectAll?: () => void;
	onActionClick?: (action: string, row: any) => void;
	onRowClick?: (row: any) => void;
};

const CellRenderer = ({
	type,
	value,
	row,
}: {
	type?: ReportTableCellType;
	value: any;
	row: any;
}) => {
	switch (type) {
		case "employee":
			return (
				<div className={styles.Rpt__employee}>
					<div>
						<h4>{row.name}</h4>
					</div>
				</div>
			);

		case "status":
			return (
				<span className={`${styles.Rpt__status} ${styles[`Rpt__status${String(value).replace(/\s/g, "")}`]}`}>
					{value}
				</span>
			);

		case "toggle":
			return (
				<label className={styles.Rpt__switch}>
					<input
						type="checkbox"
						checked={value}
						readOnly
					/>
					<span />
				</label>
			);

		case "envChips":
			return (
				<div className={styles.Rpt__chips}>
					{String(value)
						.split(",")
						.map((item) => (
							<span key={item}>
								{item}
							</span>
						))}
				</div>
			);

		case "flagPill":
		case "responsePill":
		case "pill":
			return (
				<span
					className={`${styles.Rpt__pill} ${
						styles[`Rpt__pill${String(value).replace(/\s/g, "")}`]
					}`}
				>
					{value}
				</span>
			);

		case "evals":
			return (
				<span className={styles.Rpt__evals}>
					{value}
				</span>
			);

		default:
			return value;
	}
};

const ReportTable = ({
	config,
	selectedRows = [],
	onSelectRow,
	onSelectAll,
	onActionClick,
	onRowClick
}: ReportTableProps) => {
	return (
		<div className={styles.Rpt__wrapper}>
			<div className={styles.Rpt__tableContainer}>
				<table className={styles.Rpt__table}>
					<thead>
						<tr>
							{config.selectable && (
								<th>
									<input
										type="checkbox"
										checked={
											config.rows.length > 0 &&
											selectedRows.length === config.rows.length
										}
										onChange={onSelectAll}
									/>
								</th>
							)}

							{config.headers.map((header) => (
								<th key={header.key}>
									{header.label}
								</th>
							))}

							{config.actions?.length ? (
								<th>ACTIONS</th>
							) : null}
						</tr>
					</thead>

					<tbody>
						{config.rows.map((row) => (
							<tr key={row.id} onClick={()=>onRowClick?.(row)}>
								{config.selectable && (
									<td>
										<input
											type="checkbox"
											checked={selectedRows.includes(row.id)}
											onChange={() => { onSelectRow?.(row.id) }}
											onClick={(e)=>e.stopPropagation()}
										/>
									</td>
								)}

								{config.headers.map((header) => (
									<td key={header.key}>
										<CellRenderer
											type={header.cellType}
											value={row[header.key]}
											row={row}
										/>
									</td>
								))}

								{config.actions?.length ? (
									<td>
										<div className={styles.Rpt__actions}>
											{config.actions.map((action) => {
												const Icon = action.icon;

												return (
													<button
														key={action.action}
														onClick={(e) => {
															e.stopPropagation(); 
															onActionClick?.(action.action, row);
														}
														}
													>
														<Icon size={16} />
													</button>
												);
											})}
										</div>
									</td>
								) : null}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{config.pagination && (
				<div className={styles.Rpt__pagination}>
					<p>
						Showing 1-
						{Math.min(
							config.rowsPerPage ?? 10,
							config.rows.length
						)}
					</p>

					<div className={styles.Rpt__paginationButtons}>
						<button>{"<"}</button>
						<button className={styles.Rpt__pageActive}>
							1
						</button>
						<button>{">"}</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReportTable;