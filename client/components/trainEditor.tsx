import {
	ChangeEvent, Fragment, useCallback, useEffect, useMemo, useState
} from 'react';
import {
	allCarsSame as allCarsSameFn,
	allCarsSameLength, CarShape, convertSameToCustomFull,
	convertSameToCustomKeepCar, CustomTrainState, TrainEditorState
} from 'model/trainEditorState';
import { assertUnreachable } from 'utils/assert';
import SwitchSelector from 'react-switch-selector';
import ReactTooltip from 'react-tooltip';
import NoSsr from 'utils/noSsr';
import Train from './train';
import styles from '../styles/Train.module.css';
import outerStyles from '../styles/TrainEditor.module.css';

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

	useEffect(() => {
		ReactTooltip.rebuild();
	}, [allCarsSame]);

	//
	// #region State Mutation
	// ================
	//  State Mutation
	// ================
	//

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
			case 'customEvenRows': {
				const rowsPerCar = Number(evt.target.value);
				const numCars = props.rows / rowsPerCar;
				const oldNumCars = props.rows / state.rowsPerCar;
				setState({
					...state,
					rowsPerCar,
					carDesign: numCars <= oldNumCars
						? state.carDesign.slice(0, numCars)
						: state.carDesign.concat(
							Array.from(Array(numCars - oldNumCars).keys())
								.map((__) => state.carDesign[0])
						),
				});
				break;
			}
			case 'custom': {
				const rowsPerCar = Number(evt.target.value);
				const numCars = props.rows / rowsPerCar;
				const oldNumCars = state.rowsPerCar.length;
				setState({
					...state,
					type: 'customEvenRows',
					rowsPerCar,
					carDesign: numCars <= oldNumCars
						? state.carDesign.slice(0, numCars)
						: state.carDesign.concat(
							Array.from(Array(numCars - oldNumCars).keys())
								.map((__) => state.carDesign[0])
						),
				});
				break;
			}
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
		const setCarTypes = (input: CustomTrainState): CarShape[] => {
			const inputDesigns = input.carDesign;
			if (inputDesigns.length >= rowsPerCar.length) {
				return inputDesigns.slice(0, rowsPerCar.length);
			}
			return inputDesigns.concat(
				Array.from(Array(rowsPerCar.length - inputDesigns.length).keys())
					.map((_) => inputDesigns[0])
			);
		};

		if (state.type !== 'custom') {
			if (allCarsSame) {
				// eslint-disable-next-line no-restricted-globals, no-alert
				if (!confirm('This will result in different cars having different numbers of rows. Are you sure you wish to continue?')) {
					return;
				}
			}
			const newState: TrainEditorState = state.type === 'standard'
				? { ...convertSameToCustomFull(state, props.rows), rowsPerCar }
				: {
					...state, type: 'custom', rowsPerCar, carDesign: setCarTypes(state)
				};
			setState(newState);
		} else {
			setState({ ...state, rowsPerCar, carDesign: setCarTypes(state) });
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

	// #endregion

	//
	// #region Render Functions
	// ==================
	//  Render Functions
	// ==================
	//

	const blankSeat = useCallback(() => <div
		className='seat'
		style={{
			backgroundColor: 'rgb(128,128,128)',
			height: '30px',
			width: '30px',
			margin: '0 5px',
			display: 'inline-block',
			verticalAlign: 'middle'
		}}
	></div>, []);

	const gap = useCallback(
		(r: number, c: number) => <DeleteSpaceBtn
			r={r} c={c} state={state} removeSpace={removeSpace} />,
		[state, removeSpace]
	);

	const sidebar = useCallback(
		(carNum: number) => <SideBar
			carNum={carNum} state={state}
			setCarType={setCarType} changeToCustom={changeToCustom}
		/>,
		[state, setCarType, changeToCustom]
	);

	const addGap = useCallback((r: number, c: number) => ((state.type !== 'standard' || r < state.rowsPerCar)
		? <div className={styles.spaceAdd} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
			<button onClick={() => addSpace(r, c)}>+</button>
		</div>
		: null), [state, addSpace]);

	const rowEdit = useCallback((r: number) => <RowEdit
		key={r}
		rowsPerCar={state.rowsPerCar}
		r={r}
		mergeRow={mergeRow}
		splitRow={splitRow}
	/>, [state, mergeRow, splitRow]);

	// #endregion

	//
	// #region Render
	// ========
	//  Render
	// ========
	//

	return <>
		<NoSsr>
			<ReactTooltip effect='solid' backgroundColor='rgb(64,64,64)' />
		</NoSsr>
		<div className={outerStyles.side}>
			<Train
				rows={props.rows}
				cols={props.cols}

				rowsPerCar={state.rowsPerCar}
				carDesign={state.carDesign}
				spacings={state.spacings}

				render={blankSeat}
				renderGap={gap}

				renderCarSide={sidebar}
				renderColGap={addGap}
				renderRowGap={rowEdit}
			/>
		</div>
		<PageSidebar state={state} rows={rows} setRows={setRows} />
	</>;
	// #endregion
}

function PageSidebar(props: {
	state: TrainEditorState,
	rows: number[],
	setRows: (evt: ChangeEvent<HTMLSelectElement>) => void
}) {
	const { state, rows, setRows } = props;

	const numCars = state.type !== 'custom' ? (rows.length / state.rowsPerCar) : state.rowsPerCar.length;
	const maxRowsPerCar = useMemo(
		() => (state.type !== 'custom'
			? state.rowsPerCar
			: state.rowsPerCar.reduce((a, x, i, arr) => Math.max(a, i === 0 ? x : x - arr[i - 1]), 0)),
		[state]
	);

	return <div className={`${outerStyles.side} ${outerStyles.sidebar}`}>
		<section className={outerStyles.instruction}>
			Edit the train to match the layout of the ride.
		</section>
		<p>
			Use the circular shape for spinning cars
			Otherwise, keep the cars rectangular, regardless of shape.
		</p>
		<p>
			Add spaces between seats (the little +) to represent variations in spacing in real life.
			If all seats are equally far apart, no need to add spaces.
		</p>
		<p>
			If RCDB contradicts the park, defer to the park.
			<br />
			e.g. on B&amp;M hypers with staggered seating,
			use two rows of two seats, not one row of four.
		</p>
		<p className={outerStyles.instruction}>
			Rows per car: <select onChange={setRows} value={state.type === 'custom' ? 'Custom' : state.rowsPerCar}>{
				rows
					.filter((x) => rows.length % (x + 1) === 0)
					.map((r) => <option key={r} value={r + 1}>{r + 1}</option>)
					.concat(<option key='custom'>Custom</option>)
			}</select>
		</p>
		<p>{ maxRowsPerCar === 1 ? 'Each row in this train articulates independently.'
			: `This train contains ${numCars} cars, each with ${
				state.type !== 'custom' ? state.rowsPerCar : 'a custom number of'
			} rows.`
		}</p>
		{maxRowsPerCar > 3 ? <><p className={outerStyles.warn}>
			This train has more than three rows per car.
			This is quite unusual, in my experience.
			Are you sure you set the right settings?
		</p><p>
			If each row articulates independently, please set 1 row per car.
		</p></> : null}
	</div>;
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

function SideBar(props: {
	carNum: number,
	state: TrainEditorState,
	setCarType: (s: CarShape, n: number) => void,
	changeToCustom: (evt: ChangeEvent<HTMLInputElement>) => void,
}) {
	const {
		carNum, state, setCarType, changeToCustom
	} = props;
	const setType = useCallback(
		(v: unknown) => setCarType(v as CarShape, carNum),
		[carNum, setCarType]
	);
	return <div className={styles.wrap}>{
		(carNum === 0 || state.type !== 'standard')
			? <div style={{ display: 'inline-block', width: '100px' }}><SwitchSelector
				onChange={setType}
				options={[{
					label: <div data-tip="Standard Car" style={{
						width: '15px', height: '15px', margin: '5px 0', background: 'black', fontSize: 0, transform: 'translateX(-2px)'
					}}>Standard Car</div>,
					value: 'normal' as const,
				}, {
					label: <div data-tip="Spinning Car" style={{
						width: '15px', height: '15px', margin: '5px', background: 'black', fontSize: 0, borderRadius: '15px', transform: 'translateX(-2px)'
					}}>Spinning Car</div>,
					value: 'circular' as const,
				}]}
				name={`selectorCar${carNum}`}
				forcedSelectedIndex={(state.type === 'standard' ? state.carDesign : state.carDesign[carNum]) === 'normal' ? 0 : 1}
				backgroundColor={'rgba(230,230,230)'}
				selectedBackgroundColor={'rgba(128,128,128)'}
				fontColor={'black'}
			/></div>
			: null
	}{
		carNum === 0
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
	</div>;
}
