import {
	ChangeEvent, Fragment, useCallback, useMemo, useState
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

	const rows = useMemo(() => Array.from(Array(props.rows).keys()), [props.rows]);
	const cols = useMemo(() => Array.from(Array(props.cols).keys()), [props.cols]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const dummySpacings = useMemo(() => rows.map((_) => cols.map((_2) => true)), [rows, cols]);

	const [spacings, setSpacings] = useState<boolean[][]>(dummySpacings);

	const allCarsSame = useMemo(() => {
		if (typeof rowsPerCar === 'number') {
			return true;
		}
		if (rowsPerCar.length === 0) { return true; }
		const carLength = rowsPerCar[0] + 1;
		return rowsPerCar.every((x, i, a) => i === 0 || (x - a[i - 1]) === carLength);
	}, [rowsPerCar]);

	const setRows = useCallback((evt: ChangeEvent<HTMLSelectElement>) => {
		if (evt.target.value !== 'Custom') {
			if (typeof rowsPerCar !== 'number' && !allCarsSame) {
				// eslint-disable-next-line no-restricted-globals, no-alert
				if (!confirm('This will overwrite any modifications you\'ve made to specific cars and reset all cars to match the first one. Are you sure you want to continue?')) {
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
	}, [rowsPerCar, rows, allCarsSame]);

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
			setRowsPerCar(rows
				.filter((i) => (i + 1) % rowsPerCar === 0)
				.concat(row)
				.sort((a, b) => a - b));
		} else {
			setRowsPerCar(rowsPerCar.concat(row).sort((a, b) => a - b));
		}
	}, [rowsPerCar, rows]);

	const addSpace = useCallback((row: number, seat: number) => {
		const r = spacings[row];
		const newR = r.slice(0, seat + 1).concat(false).concat(r.slice(seat + 1, r.length));
		const newSpacings = spacings.slice();
		newSpacings[row] = newR;
		setSpacings(newSpacings);
	}, [spacings]);

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
				{spacings.map((colSpacings, r) => <Fragment key={r}>
					<tr>
						<td>{r + 1}</td>
						<td><div>
							{colSpacings.map((seat, c) => <Fragment key={c}>
								{seat ? <><div
									className='seat'
									style={{
										backgroundColor: 'rgb(128,128,128)', height: '30px', width: '30px', margin: '0 5px', display: 'inline-block', verticalAlign: 'middle'
									}}
								></div></> : <div style={{
									height: '30px', width: '30px', margin: 0, display: 'inline-block', verticalAlign: 'middle'
								}}>•</div>
								}
								{ c !== (colSpacings.length - 1)
									? <div className={styles.spaceAdd} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
										<button onClick={() => addSpace(r, c)}>+</button>
									</div>
									: null }
							</Fragment>)}
						</div></td>
					</tr>
					{r !== (props.rows - 1)
						? <RowEdit
							rowsPerCar={rowsPerCar}
							r={r}
							cols={props.cols}
							mergeRow={mergeRow}
							splitRow={splitRow}
						/> : null
					}
				</Fragment>)}
			</tbody>
		</table>
	</section>;
}

function RowEdit(props: {
	rowsPerCar: number | number[],
	r: number,
	cols: number,
	mergeRow: (x: number) => void,
	splitRow: (x: number) => void,
}) {
	const {
		rowsPerCar, r, cols, mergeRow, splitRow
	} = props;
	const merge = useCallback(() => mergeRow(r), [r, mergeRow]);
	const split = useCallback(() => splitRow(r), [r, splitRow]);

	const isDel = (typeof rowsPerCar === 'number' ? ((r + 1) % rowsPerCar === 0) : (rowsPerCar.indexOf(r) !== -1));

	return <tr>
		<td key={isDel ? 'del' : 'add'} style={{ height: '1px' }} colSpan={2 * cols}>
			<button className={`${styles.rowBtn} ${isDel ? styles.del : styles.add}`} onClick={isDel ? merge : split}>
				<span>{isDel ? '🗙' : '+'}</span>
			</button>
		</td>
	</tr>;
}
