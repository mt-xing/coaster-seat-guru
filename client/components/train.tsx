import React, {
	Fragment, ReactNode, useCallback, useMemo
} from 'react';
import { CarShape } from 'model/trainEditorState';
import styles from '../styles/Train.module.css';

export type TrainProps = {
	rows: number,
	cols: number,

	rowsPerCar?: number | number[],
	carDesign?: CarShape | CarShape[],
	spacings?: boolean[][],

	/** IMPORTANT: Column is indexing the seats, EXCLUDING gaps */
	render: (row: number, seatCol: number) => ReactNode,
	/** IMPORTANT: Column is indexing total spaces, INCLUDING gaps */
	renderGap?: (row: number, overallCol: number) => ReactNode,

	renderCarSide?: (car: number) => ReactNode,
	renderColGap?: (row: number, col: number) => ReactNode,
	renderRowGap?: (row: number) => ReactNode,
};

export default function Train(props: TrainProps) {
	const rows = useMemo(() => Array.from(Array(props.rows).keys()), [props.rows]);
	const cols = useMemo(() => Array.from(Array(props.cols).keys()), [props.cols]);

	const {
		rowsPerCar, carDesign, spacings, render, renderGap, renderCarSide, renderColGap, renderRowGap
	} = props;
	if (rowsPerCar === undefined || carDesign === undefined || spacings === undefined) {
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

	return <section className={`${styles.coaster} ${styles.trainEdit}`}>
		<p>Front of train</p>
		<table className={styles.coasterTrain}>
			<tbody>
				{
					typeof rowsPerCar === 'number' ? (
						Array.from(Array(props.rows / rowsPerCar).keys())
							.map((i) => <TrainCar
								key={i}
								carNum={i}
								numRows={rowsPerCar}
								cols={props.cols}
								startingRow={i * rowsPerCar}
								lastCar={i === props.rows / rowsPerCar - 1}
								carType={Array.isArray(carDesign) ? carDesign[i] : carDesign}
								spacings={spacings}

								render={render}
								renderGap={renderGap}
								renderCarSide={renderCarSide}
								renderColGap={renderColGap}
								renderRowGap={renderRowGap}
							/>)
					) : (
						rowsPerCar.map((carSplitLoc, carI) => <TrainCar
							key={carI}
							carNum={carI}
							numRows={carI === 0 ? carSplitLoc + 1 : carSplitLoc - rowsPerCar[carI - 1]}
							cols={props.cols}
							startingRow={carI === 0 ? 0 : rowsPerCar[carI - 1] + 1}
							lastCar={carI === rowsPerCar.length - 1}
							carType={Array.isArray(carDesign) ? carDesign[carI] : carDesign}
							spacings={spacings}

							render={render}
							renderGap={renderGap}
							renderCarSide={renderCarSide}
							renderColGap={renderColGap}
							renderRowGap={renderRowGap}
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
	carNum: number,
	lastCar: boolean,
	carType: CarShape,
	spacings: boolean[][],

	/** IMPORTANT: Column is indexing the seats, EXCLUDING gaps */
	render: (row: number, seatCol: number) => ReactNode,
	/** IMPORTANT: Column is indexing total spaces, INCLUDING gaps */
	renderGap?: (row: number, overallCol: number) => ReactNode,

	renderCarSide?: (car: number) => ReactNode,
	renderColGap?: (row: number, col: number) => ReactNode,
	renderRowGap?: (row: number) => ReactNode,
}) {
	const rows = useMemo(() => Array.from(Array(props.numRows).keys()), [props.numRows]);
	const {
		lastCar, carNum, carType, spacings,
		render, renderGap, renderCarSide, renderColGap, renderRowGap,
	} = props;
	const rg = useCallback(
		((r: number, c: number) => (renderGap ? renderGap(r, c) : null)),
		[renderGap]
	);

	return <><tr>
		<td><table className={`${styles.coasterTrain} ${styles.coasterCar}${carType === 'circular' ? ` ${styles.roundCar}` : ''}`}>
			<tbody>
				{rows.map((rRaw) => {
					const r = rRaw + props.startingRow;
					const colSpacings = r < spacings.length ? spacings[r] : spacings[rRaw];
					return <Fragment key={r}>
						<tr>
							<td>{r + 1}</td>
							<td><div>
								{colSpacings.reduce((acc, seat, c) => {
									acc.v.push(<Fragment key={c}>
										{seat
											? render(r, acc.numSeats++)
											: rg(r, c)
										}
										{
											renderColGap
											&& c !== (colSpacings.length - 1)
												? renderColGap(r, c)
												: null
										}
									</Fragment>);
									return acc;
								}, { v: [], numSeats: 0 } as {v: ReactNode[], numSeats: number}).v}
							</div></td>
						</tr>
						{renderRowGap && rRaw !== props.numRows - 1 ? renderRowGap(r) : null}
					</Fragment>;
				})}
			</tbody>
		</table></td>
		{ renderCarSide ? <td className={styles.carOptions}>{ renderCarSide(carNum) }</td> : null }
	</tr>
	{ renderRowGap && !lastCar ? renderRowGap(props.numRows - 1 + props.startingRow) : null }
	</>;
}
