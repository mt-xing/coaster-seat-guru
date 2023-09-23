import React, {
	Fragment, ReactNode, useMemo
} from 'react';
import { CarShape } from 'model/trainEditorState';
import useResizeObserver from 'use-resize-observer';
import styles from '../styles/DisplayTrain.module.css';

export type TrainProps = {
	rows: number,
	cols: number,

	rowsPerCar?: number | number[],
	carDesign?: CarShape | CarShape[],
	spacings?: boolean[][],

	/** IMPORTANT: Column is indexing the seats, EXCLUDING gaps */
	render: (row: number, seatCol: number) => ReactNode,
	/** IMPORTANT: Column is indexing total spaces, INCLUDING gaps */
	renderGap: (row: number, overallCol: number) => ReactNode,
};

export default function Train(props: TrainProps) {
	const rows = useMemo(() => Array.from(Array(props.rows).keys()), [props.rows]);
	const cols = useMemo(() => Array.from(Array(props.cols).keys()), [props.cols]);

	const { ref: wrapRef, width: wrapWidth } = useResizeObserver<HTMLElement>();
	const computedHeightStyle = useMemo(() => {
		if (wrapWidth) {
			return { height: `${wrapWidth}px` };
		}
		return undefined;
	}, [wrapWidth]);

	const {
		rowsPerCar, carDesign, spacings, render, renderGap,
	} = props;
	if (rowsPerCar === undefined || carDesign === undefined || spacings === undefined) {
		return <section style={computedHeightStyle} className={styles.coaster}>
			<table className={styles.coasterTrain} ref={wrapRef}>
				<tbody style={{ padding: '0 35px' }}>
					{rows.map((r) => <tr key={r}>
						<td className={`${styles.rowMarker} ${styles.legacyRowMarker}`}>{r + 1}</td>
						{cols.map((c) => <td key={c}>
							{props.render(r, c)}
						</td>)}
					</tr>)}
				</tbody>
			</table>
		</section>;
	}

	return <section style={computedHeightStyle} className={`${styles.coaster} ${styles.trainEdit}`}>
		<div className={styles.coasterTrain} ref={wrapRef}>
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
					/>)
				)
			}
		</div>
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
	renderGap: (row: number, overallCol: number) => ReactNode,
}) {
	const rows = useMemo(() => Array.from(Array(props.numRows).keys()), [props.numRows]);
	const {
		carType, spacings,
		render, renderGap,
	} = props;

	return <table className={`${styles.coasterCar} ${carType === 'circular' ? ` ${styles.roundCar}` : ''}`}>
		<tbody>
			{rows.map((rRaw) => {
				const r = rRaw + props.startingRow;
				const colSpacings = r < spacings.length ? spacings[r] : spacings[rRaw];
				return <tr key={r}>
					<td className={styles.rowMarker}>{r + 1}</td>
					<td><div style={{ whiteSpace: 'nowrap', marginBottom: '2px' }}>
						{colSpacings.reduce((acc, seat, c) => {
							acc.v.push(<Fragment key={c}>
								{seat
									? render(r, acc.numSeats++)
									: renderGap(r, c)
								}

							</Fragment>);
							return acc;
						}, { v: [], numSeats: 0 } as {v: ReactNode[], numSeats: number}).v}
					</div></td>
				</tr>;
			})}
		</tbody>
	</table>;
}
