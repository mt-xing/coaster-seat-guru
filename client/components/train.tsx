import { ReactNode } from 'react';
import styles from '../styles/Train.module.css';

export type TrainProps = {
	rows: number,
	cols: number,
	render: (row: number, col: number) => ReactNode,
};

export default function Train(props: TrainProps) {
	const rows = Array.from(Array(props.rows).keys());
	const cols = Array.from(Array(props.cols).keys());
	return <section className={styles.coaster}>
		<p>Front of train</p>
		<table className={styles.coasterTrain}>
			<tbody>
				{rows.map((r) => <tr key={r}>
					<td>{r + 1}</td>
					{cols.map((c) => <td key={c}>
						{props.render(r, c)}
					</td>)}
				</tr>)}
			</tbody>
		</table>
	</section>;
}
