import { TrainEditorState } from 'model/trainEditorState';
import {
	ChangeEvent, ReactNode, useCallback, useState
} from 'react';
import styles from '../styles/TrainEditor.module.css';

export default function Splash(props: {finishSetup: (
	rows: number, cols: number, state: TrainEditorState
) => void, initialRows: number, initialCols: number, allowRowEdit: boolean}) {
	const { finishSetup, allowRowEdit } = props;

	const [rows, setRows] = useState<number>(props.initialRows);
	const [cols, setCols] = useState<number>(props.initialCols);

	const setColsSafe = useCallback((v: ChangeEvent<HTMLInputElement>) => {
		if (!allowRowEdit) { return; }
		const val = Math.floor(Number(v.target.value));
		if (val < 0 || val > 100) {
			return;
		}
		setCols(val);
	}, [setCols, allowRowEdit]);
	const setRowsSafe = useCallback((v: ChangeEvent<HTMLInputElement>) => {
		if (!allowRowEdit) { return; }
		const val = Math.floor(Number(v.target.value));
		if (val < 0 || val > 100) {
			return;
		}
		setRows(val);
	}, [setRows, allowRowEdit]);

	return <main>
		<h2>Train Setup</h2>
		<p>
			If RCDB contradicts the signage in the station, defer to the park.
			<br />
			e.g. on B&amp;M hypers with staggered seating,
			use two rows of two seats per car, not one row of four.
		</p>
		<p>
			My site does not currently support variable numbers of seats per row.
			<br />
			If a train has a more esoteric design, please let me know.
		</p>
		<p className={styles.numInputWrap}><label>
			<span className={styles.wrap}>
				<span className={styles.first}>Rows</span>{' '}
				<span className={styles.second}>per Train</span>
			</span>
			<input type='number' min={0} max={100} value={rows} onChange={setRowsSafe} disabled={!allowRowEdit} />
		</label></p>
		<p className={styles.numInputWrap}><label>
			<span className={styles.wrap}>
				<span className={styles.first}>Seats</span>{' '}
				<span className={styles.second}>per Row</span>
			</span>
			<input type='number' min={0} max={100} value={cols} onChange={setColsSafe} disabled={!allowRowEdit} />
		</label></p>
		{
			rows * cols === 0
				? null
				: <p>Just to confirm, each train sits {rows} &times; {cols} = {rows * cols} people.</p>
		}
		{
			rows * cols > 50
				? <p className={styles.warn}>
					These trains sit over 50 people each. That seems high.
					Are you sure your numbers are right?
				</p>
				: null
		}
		{
			rows * cols === 0 ? null : <section>
				<h2>Standard Templates</h2>
				<ul className={styles.templateList}>
					{standardTemplates.map(renderTemplate.bind({}, finishSetup, rows, cols))}
				</ul>
				<h2>Special Designs</h2>
				<ul className={styles.templateList}>
					{specialTemplates.map(renderTemplate.bind({}, finishSetup, rows, cols))}
				</ul>
			</section>
		}
	</main>;
}

type SeatTemplate = {
	validator: (rows: number, cols: number) => boolean,
	mapping: (rows: number, cols: number) => TrainEditorState,
	text: string,
	layout: (cols: number) => ReactNode,
}

const renderTemplate = (
	finishSetup: (r: number, c: number, state: TrainEditorState) => void,
	rows: number,
	cols: number,
	template: SeatTemplate
) => (
	template.validator(rows, cols)
		? <li key={template.text}>
			<button onClick={() => finishSetup(rows, cols, template.mapping(rows, cols))}>
				{template.layout(cols)}<br />{template.text}
			</button>
		</li>
		: null
);

const standardTemplates: SeatTemplate[] = [
	{
		validator: () => true,
		mapping: (_r, c) => ({
			type: 'standard',
			rowsPerCar: 1,
			carDesign: 'normal',
			spacings: [Array.from(Array(c).keys()).map((_) => true)],
		}),
		text: '1 Row Cars',
		layout: (c) => <div className={styles.carWrap}>
			<div className={styles.car}>
				<div className={styles.row}>
					{Array.from(Array(c).keys()).map((i) => <div key={i} className={styles.seat} />)}
				</div>
			</div>
		</div>,
	},
	{
		validator: (r) => r % 2 === 0,
		mapping: (_r, c) => ({
			type: 'standard',
			rowsPerCar: 2,
			carDesign: 'normal',
			spacings: [Array.from(Array(c).keys()).map((_) => true),
				Array.from(Array(c).keys()).map((_) => true)],
		}),
		text: '2 Row Cars',
		layout: (c) => <div className={styles.carWrap}>
			<div className={styles.car}>
				<div className={styles.row}>
					{Array.from(Array(c).keys()).map((i) => <div key={i} className={styles.seat} />)}
				</div>
				<div className={styles.row}>
					{Array.from(Array(c).keys()).map((i) => <div key={i} className={styles.seat} />)}
				</div>
			</div>
		</div>,
	},
	{
		validator: (r) => r % 3 === 0,
		mapping: (_r, c) => ({
			type: 'standard',
			rowsPerCar: 3,
			carDesign: 'normal',
			spacings: [Array.from(Array(c).keys()).map((_) => true),
				Array.from(Array(c).keys()).map((_) => true),
				Array.from(Array(c).keys()).map((_) => true)],
		}),
		text: '3 Row Cars',
		layout: (c) => <div className={styles.carWrap}>
			<div className={styles.car}>
				<div className={styles.row}>
					{Array.from(Array(c).keys()).map((i) => <div key={i} className={styles.seat} />)}
				</div>
				<div className={styles.row}>
					{Array.from(Array(c).keys()).map((i) => <div key={i} className={styles.seat} />)}
				</div>
				<div className={styles.row}>
					{Array.from(Array(c).keys()).map((i) => <div key={i} className={styles.seat} />)}
				</div>
			</div>
		</div>,
	},
];

const specialTemplates: SeatTemplate[] = [
	{
		validator: (r, c) => r % 2 === 0 && c === 2,
		mapping: (_r, _c) => ({
			type: 'standard',
			rowsPerCar: 2,
			carDesign: 'circular',
			spacings: [[true, true], [true, true]],
		}),
		text: 'Spinning',
		layout: (_) => <div className={styles.carWrap}>
			<div className={`${styles.car} ${styles.spin}`}>
				<div className={styles.row}>
					<div className={styles.seat} />
					<div className={styles.seat} />
				</div>
				<div className={styles.row}>
					<div className={styles.seat} />
					<div className={styles.seat} />
				</div>
			</div>
		</div>,
	},
	{
		validator: (_, c) => c === 4,
		mapping: (_r, _c) => ({
			type: 'standard',
			rowsPerCar: 1,
			carDesign: 'normal',
			spacings: [[true, true, false, true, true]],
		}),
		text: 'Wing Seating',
		layout: (_) => <div className={styles.carWrap}>
			<div className={styles.car}>
				<div className={styles.row}>
					<div className={styles.seat} />
					<div className={styles.seat} />
					<div className={styles.gap} />
					<div className={styles.seat} />
					<div className={styles.seat} />
				</div>
			</div>
		</div>,
	},
	{
		validator: (r, c) => r % 2 === 0 && c === 2,
		mapping: (_r, _c) => ({
			type: 'standard',
			rowsPerCar: 2,
			carDesign: 'normal',
			spacings: [[true, true], [true, false, true]],
		}),
		text: 'B&M Hyper Staggered',
		layout: (_) => <div className={styles.carWrap}>
			<div className={styles.car}>
				<div className={styles.row}>
					<div className={styles.seat} />
					<div className={styles.seat} />
				</div>
				<div className={styles.row}>
					<div className={styles.seat} />
					<div className={styles.gap} />
					<div className={styles.seat} />
				</div>
			</div>
		</div>,
	},
	{
		validator: () => true,
		mapping: (_r, c) => ({
			type: 'standard',
			rowsPerCar: 1,
			carDesign: 'normal',
			spacings: [Array.from(Array(c).keys()).map((_) => true)],
		}),
		text: 'Custom',
		layout: (_) => <div className={styles.carWrap}>
			<div className={styles.car} style={{ fontSize: '150%', padding: '0.75em 1.5em' }}>?</div>
		</div>,
	},
];
