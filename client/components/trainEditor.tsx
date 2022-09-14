import {
	ChangeEvent, Fragment, useCallback, useState
} from 'react';
import styles from '../styles/Train.module.css';

export type TrainProps = {
	rows: number,
	cols: number,
};

export default function TrainEditor(props: TrainProps) {
	// If array, each entry is zero-index number of row after which to cut the car,
	// INCLUDING last car; length === number of cars
	const [rowsPerCar, setRowsPerCar] = useState<number | number[]>(1);

	const rows = Array.from(Array(props.rows).keys());
	const cols = Array.from(Array(props.cols).keys());

	const setRows = useCallback((evt: ChangeEvent<HTMLSelectElement>) => {
		if (evt.target.value !== 'Custom') {
			if (typeof rowsPerCar !== 'number') {
				// eslint-disable-next-line no-restricted-globals, no-alert
				if (!confirm('This will overwrite any modifications you\'ve made to specific cars and reset all cars to match the first one. Are you sure you want to continue?')) {
					// TODO: check for per-car modifications
					return;
				}
			}
			setRowsPerCar(Number(evt.target.value));
			return;
		}
		if (typeof rowsPerCar !== 'number') {
			return;
		}
		setRowsPerCar(rows.filter((i) => (i + 1) % rowsPerCar === 0));
	}, [rowsPerCar, rows]);

	const mergeRow = useCallback((row: number) => {
		if (typeof rowsPerCar === 'number') {
			// eslint-disable-next-line no-restricted-globals, no-alert
			if (!confirm('This will result in different cars having different numbers of rows. Are you sure you wish to continue?')) {
				// TODO: check for per-car modifications
				return;
			}
			setRowsPerCar(rows.filter((i) => (i + 1) % rowsPerCar === 0 && i !== row));
		} else {
			setRowsPerCar(rowsPerCar.filter((x) => x !== row));
		}
	}, [rowsPerCar, rows]);

	const splitRow = useCallback((row: number) => {
		if (typeof rowsPerCar === 'number') {
			// eslint-disable-next-line no-restricted-globals, no-alert
			if (!confirm('This will result in different cars having different numbers of rows. Are you sure you wish to continue?')) {
				// TODO: check for per-car modifications
				return;
			}
			setRowsPerCar(rows.filter((i) => (i + 1) % rowsPerCar === 0).concat(row).sort());
		} else {
			setRowsPerCar(rowsPerCar.concat(row).sort());
		}
	}, [rowsPerCar, rows]);

	return <section className={`${styles.coaster} ${styles.trainEdit}`}>
		<p>Rows per car: <select onChange={setRows} value={typeof rowsPerCar === 'number' ? rowsPerCar : 'Custom'}>{
			rows
				.filter((x) => props.rows % (x + 1) === 0)
				.map((r) => <option key={r} value={r + 1}>{r + 1}</option>)
				.concat(<option key='custom'>Custom</option>)
		}</select></p>

		<p>Front of train</p>
		<table className={styles.coasterTrain}>
			<tbody>
				{rows.map((r, rI) => <Fragment key={r}>
					<tr>
						<td>{r + 1}</td>
						{cols.map((c) => <td key={c}>
							<div
								className='seat'
								style={{ backgroundColor: 'rgb(128,128,128)', height: '100%' }}
							></div>
						</td>)}
					</tr>
					{
						(typeof rowsPerCar === 'number' ? ((rI + 1) % rowsPerCar === 0) : (rowsPerCar.indexOf(rI) !== -1))
						&& rI !== (props.rows - 1)
							? <tr><td key='del' style={{ height: '1px' }} colSpan={props.cols + 1}><button className={`${styles.rowBtn} ${styles.del}`} onClick={() => mergeRow(rI)}><span>🗙</span></button></td></tr>
							: <tr><td key='add' style={{ height: '1px' }} colSpan={props.cols + 1}><button className={`${styles.rowBtn} ${styles.add}`} onClick={() => splitRow(rI)}><span>+</span></button></td></tr>
					}
				</Fragment>)}
			</tbody>
		</table>
	</section>;
}
