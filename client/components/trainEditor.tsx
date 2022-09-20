import {
	ChangeEvent, Fragment, useCallback, useEffect, useMemo, useState
} from 'react';
import {
	allCarsSame as allCarsSameFn,
	allCarsSameLength, CarShape, convertSameToCustomFull, convertSameToCustomKeepCar, TrainEditorState
} from 'model/trainEditorState';
import { assertUnreachable } from 'utils/assert';
import SwitchSelector from 'react-switch-selector';
import styles from '../styles/Train.module.css';

export type TrainProps = {
	rows: number,
	cols: number,
};

export default function TrainEditor(props: TrainProps) {
	const rows = useMemo(() => Array.from(Array(props.rows).keys()), [props.rows]);
	const cols = useMemo(() => Array.from(Array(props.cols).keys()), [props.cols]);

	const dummyState = useCallback(() => ({
		type: 'standard' as const, rowsPerCar: 1, carDesign: 'normal' as const, spacings: [cols.map((_) => true)]
	}), [cols]);
	const [state, setState] = useState<TrainEditorState>(dummyState);
	const numCols = useMemo(() => (
		state.spacings[0]?.reduce((a, x) => (x ? a + 1 : a), 0) ?? 0
	), [state.spacings]);

	useEffect(() => {
		if (props.cols !== numCols) {
			setState(dummyState());
		}
	}, [dummyState, props.cols, numCols]);

	const allCarsSame = useMemo(() => allCarsSameFn(state, props.rows), [state, props.rows]);

	const setRows = useCallback((evt: ChangeEvent<HTMLSelectElement>) => {
		if (evt.target.value !== 'Custom') {
			if (!allCarsSameLength(state)) {
				// eslint-disable-next-line no-restricted-globals, no-alert
				if (!confirm('This will overwrite any custom car-lengths and reset all cars to match the first one. Are you sure you want to continue?')) {
					return;
				}
			}

			switch (state.type) {
			case 'standard': {
				const rowsPerCar = Number(evt.target.value);
				setState({
					...state,
					rowsPerCar,
					spacings: rowsPerCar <= state.rowsPerCar
						? state.spacings.slice(0, rowsPerCar)
						: state.spacings.concat(
							Array.from(Array(rowsPerCar - state.rowsPerCar).keys())
								.map((__) => cols.map((_) => true))
						),
				});
				break;
			}
			case 'customEvenRows':
				setState({
					...state,
					rowsPerCar: Number(evt.target.value)
				});
				break;
			case 'custom':
				setState({
					...state,
					type: 'customEvenRows',
					rowsPerCar: Number(evt.target.value),
				});
				break;
			default:
				assertUnreachable(state);
			}
			return;
		}

		// Set to custom number of rows

		if (state.type === 'custom') {
			return;
		}
		const { rowsPerCar } = state;
		const newState: TrainEditorState = state.type === 'standard'
			? convertSameToCustomFull(state, props.rows)
			: { ...state, type: 'custom', rowsPerCar: rows.filter((i) => (i + 1) % rowsPerCar === 0) };

		setState(newState);
	}, [state, props.rows, rows, cols]);

	const rowEditHelper = useCallback((rowsPerCar: number[]) => {
		if (state.type !== 'custom') {
			if (allCarsSame) {
				// eslint-disable-next-line no-restricted-globals, no-alert
				if (!confirm('This will result in different cars having different numbers of rows. Are you sure you wish to continue?')) {
					return;
				}
			}
			const newState: TrainEditorState = state.type === 'standard'
				? { ...convertSameToCustomFull(state, props.rows), rowsPerCar }
				: { ...state, type: 'custom', rowsPerCar };
			setState(newState);
		} else {
			setState({ ...state, rowsPerCar });
		}
	}, [state, props.rows, allCarsSame]);

	const mergeRow = useCallback((row: number) => {
		rowEditHelper(
			state.type !== 'custom'
				? rows.filter((i) => (i + 1) % state.rowsPerCar === 0 && i !== row)
				: state.rowsPerCar.filter((x) => x !== row)
		);
	}, [state, rows, rowEditHelper]);

	const splitRow = useCallback((row: number) => {
		rowEditHelper(
			state.type !== 'custom'
				? rows
					.filter((i) => (i + 1) % state.rowsPerCar === 0)
					.concat(row)
					.sort((a, b) => a - b)
				: state.rowsPerCar.concat(row).sort((a, b) => a - b)
		);
	}, [state, rows, rowEditHelper]);

	const spaceEdit = useCallback((row: number, newRow: boolean[]) => {
		const newSpacings = state.spacings.slice();
		newSpacings[row] = newRow;
		setState({ ...state, spacings: newSpacings });
	}, [state]);

	const addSpace = useCallback((row: number, seat: number) => {
		const r = state.spacings[row];
		const newR = r.slice(0, seat + 1).concat(false).concat(r.slice(seat + 1));
		spaceEdit(row, newR);
	}, [state, spaceEdit]);

	const removeSpace = useCallback((row: number, col: number) => {
		const r = state.spacings[row];
		// eslint-disable-next-line no-console
		if (r[col]) { console.error('Invalid space'); return; }
		const newR = r.slice(0, col).concat(r.slice(col + 1));
		spaceEdit(row, newR);
	}, [state, spaceEdit]);

	const setCarType = useCallback((value: CarShape, car: number) => {
		if (state.type === 'standard') {
			setState({ ...state, carDesign: value });
		} else {
			const carDesign = state.carDesign.slice();
			carDesign[car] = value;
			setState({ ...state, carDesign });
		}
	}, [state]);

	const changeToCustom = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
		const { checked } = evt.currentTarget;
		// eslint-disable-next-line no-console
		if (state.type === 'custom') { console.error('How did custom train try to change checkbox?'); return; }

		switch (state.type) {
		case 'standard': {
			if (checked) { return; }
			setState(convertSameToCustomKeepCar(state, props.rows));
			break;
		}
		case 'customEvenRows': {
			if (!checked) { return; }
			if (!allCarsSame) {
				// eslint-disable-next-line no-restricted-globals, no-alert
				if (!confirm('This will reset all cars to match the first one. Are you sure you wish to continue?')) {
					return;
				}
			}
			setState({
				type: 'standard',
				rowsPerCar: state.rowsPerCar,
				spacings: state.spacings.slice(0, state.rowsPerCar),
				carDesign: state.carDesign[0],
			});
			break;
		}
		default:
			assertUnreachable(state);
		}
	}, [state, props.rows, allCarsSame]);

	return <section className={`${styles.coaster} ${styles.trainEdit}`}>
		<p>Rows per car: <select onChange={setRows} value={state.type === 'custom' ? 'Custom' : state.rowsPerCar}>{
			rows
				.filter((x) => props.rows % (x + 1) === 0)
				.map((r) => <option key={r} value={r + 1}>{r + 1}</option>)
				.concat(<option key='custom'>Custom</option>)
		}</select></p>
		<p>Front of train</p>
		<table className={styles.coasterTrain}>
			<tbody>
				{
					state.type !== 'custom' ? (
						Array.from(Array(props.rows / state.rowsPerCar).keys())
							.map((i) => <TrainCar
								key={i}
								carNum={i}
								numRows={state.rowsPerCar}
								cols={props.cols}
								startingRow={i * state.rowsPerCar}
								state={state}
								lastCar={i === props.rows / state.rowsPerCar - 1}
								mergeRow={mergeRow}
								splitRow={splitRow}
								addSpace={addSpace}
								removeSpace={removeSpace}
								setCarType={setCarType}
								changeToCustom={changeToCustom}
							/>)
					) : (
						state.rowsPerCar.map((carSplitLoc, carI) => <TrainCar
							key={carI}
							carNum={carI}
							numRows={carI === 0 ? carSplitLoc + 1 : carSplitLoc - state.rowsPerCar[carI - 1]}
							cols={props.cols}
							startingRow={carI === 0 ? 0 : state.rowsPerCar[carI - 1] + 1}
							state={state}
							lastCar={carI === state.rowsPerCar.length - 1}
							mergeRow={mergeRow}
							splitRow={splitRow}
							addSpace={addSpace}
							removeSpace={removeSpace}
							setCarType={setCarType}
							changeToCustom={changeToCustom}
						/>)
					)
				}
			</tbody>
		</table>
	</section>;
}

function TrainCar(props: {
	numRows: number,
	cols: number,
	startingRow: number,
	state: TrainEditorState,
	carNum: number,
	lastCar: boolean,

	mergeRow: (x: number) => void,
	splitRow: (x: number) => void,
	addSpace: (a: number, b: number) => void,
	removeSpace: (a: number, b: number) => void,
	setCarType: (value: CarShape, car: number) => void,
	changeToCustom: (evt: ChangeEvent<HTMLInputElement>) => void,
}) {
	const rows = useMemo(() => Array.from(Array(props.numRows).keys()), [props.numRows]);
	const {
		state, lastCar, carNum, mergeRow, splitRow, addSpace, removeSpace, setCarType, changeToCustom
	} = props;
	const changeCarType = useCallback(
		(v: unknown) => setCarType(v as CarShape, carNum),
		[setCarType, carNum]
	);
	const carType = state.type === 'standard' ? state.carDesign : state.carDesign[carNum];
	return <><tr>
		<td><table className={`${styles.coasterTrain} ${styles.coasterCar}`}>
			<tbody>
				{rows.map((rRaw) => {
					const r = rRaw + props.startingRow;
					const colSpacings = state.type === 'standard' ? state.spacings[r % state.rowsPerCar] : state.spacings[r];
					return <Fragment key={r}>
						<tr>
							<td>{r + 1}</td>
							<td><div>
								{colSpacings.map((seat, c) => <Fragment key={c}>
									{seat
										? <div
											className='seat'
											style={{
												backgroundColor: 'rgb(128,128,128)',
												height: '30px',
												width: '30px',
												margin: '0 5px',
												display: 'inline-block',
												verticalAlign: 'middle'
											}}
										></div>
										: <DeleteSpaceBtn r={r} c={c} state={state} removeSpace={removeSpace} />
									}
									{ c !== (colSpacings.length - 1) && (state.type !== 'standard' || r < state.rowsPerCar)
										? <div className={styles.spaceAdd} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
											<button onClick={() => addSpace(r, c)}>+</button>
										</div>
										: null }
								</Fragment>)}
							</div></td>
						</tr>
						{rRaw !== props.numRows - 1
							? <RowEdit
								rowsPerCar={state.rowsPerCar}
								r={r}
								mergeRow={mergeRow}
								splitRow={splitRow}
							/> : null
						}
					</Fragment>;
				})}
			</tbody>
		</table></td>
		<td className={styles.carOptions}>{
			(carNum === 0 || state.type !== 'standard')
				? <div style={{ display: 'inline-block', width: '100px' }}><SwitchSelector
					onChange={changeCarType}
					options={[{
						label: <div style={{
							width: '15px', height: '15px', margin: '5px 0', background: 'black', fontSize: 0, transform: 'translateX(-2px)'
						}}>Regular Car</div>,
						value: 'normal' as const,
					}, {
						label: <div style={{
							width: '15px', height: '15px', margin: '5px', background: 'black', fontSize: 0, borderRadius: '15px', transform: 'translateX(-2px)'
						}}>Spinning Car</div>,
						value: 'circular' as const,
					}]}
					name={`selectorCar${carNum}`}
					forcedSelectedIndex={carType === 'normal' ? 0 : 1}
					backgroundColor={'rgba(230,230,230)'}
					selectedBackgroundColor={'rgba(128,128,128)'}
					fontColor={'black'}
				/></div>
				: null
		}{
			props.startingRow === 0
				? <><div style={{ marginTop: '5px' }}><label style={{ display: 'flex', flexDirection: 'row' }}><input
					type='checkbox'
					checked={state.type === 'standard'}
					onChange={changeToCustom}
					disabled={state.type === 'custom'}
					style={{ marginRight: '4px' }}
				/> {state.type === 'custom'
					? <div><del>Same design for all cars</del><br />
						<small>Not available with custom cars</small></div>
					: <div>Same design for all cars<br />
						<small>Applies to seats and car shape</small></div>}</label></div>
				</>
				: null
		}
		</td>
	</tr>
	{!lastCar
		? <RowEdit
			key={`${props.startingRow}-${props.numRows}`}
			rowsPerCar={state.rowsPerCar}
			r={props.numRows - 1 + props.startingRow}
			mergeRow={mergeRow}
			splitRow={splitRow}
		/> : null
	}
	</>;
}

function RowEdit(props: {
	rowsPerCar: number | number[],
	r: number,
	mergeRow: (x: number) => void,
	splitRow: (x: number) => void,
}) {
	const {
		rowsPerCar, r, mergeRow, splitRow
	} = props;
	const merge = useCallback(() => mergeRow(r), [r, mergeRow]);
	const split = useCallback(() => splitRow(r), [r, splitRow]);

	const isDel = (typeof rowsPerCar === 'number' ? ((r + 1) % rowsPerCar === 0) : (rowsPerCar.indexOf(r) !== -1));

	return <tr>
		<td key={isDel ? 'del' : 'add'} style={{ height: '1px' }} colSpan={isDel ? 1 : 2}>
			<button className={`${styles.rowBtn} ${isDel ? styles.del : styles.add}`} onClick={isDel ? merge : split}>
				<span>{isDel ? '🗙' : '+'}</span>
			</button>
		</td>
	</tr>;
}

function DeleteSpaceBtn(props: {
	state:TrainEditorState, r: number, c: number, removeSpace: (r: number, c: number) => void
}) {
	const {
		state, r, c, removeSpace
	} = props;
	const rem = useCallback(() => removeSpace(r, c), [removeSpace, r, c]);
	return <div className={styles.spaceDel}>{
		(state.type !== 'standard' || r < state.rowsPerCar)
			? <button onClick={rem}><span>🗙</span></button>
			: <>•</>
	}</div>;
}
