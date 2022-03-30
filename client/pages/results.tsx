import type { NextPage } from 'next';
import Head from 'next/head';
import {
	useCallback, useEffect, useMemo, useState
} from 'react';
import { SyncLoader } from 'react-spinners';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '../components/footer';
import Header from '../components/header';
import { assertUnreachable } from '../utils/assert';
import { API_ENDPOINT, PRODUCT_NAME } from '../utils/consts';
import styles from '../styles/Results.module.css';
import btnStyle from '../styles/BigButton.module.css';
import Train from '../components/train';

type ResultsState = {
	s: 'Loading',
} | {
	s: 'Not Found',
} | ({
	s: 'Ready',
	selected: { row: number, col: number } | null,
} & QueryResult);

type QueryResult = {
	id: string,
	name: string,
	park: string,
	rows: number,
	cols: number,
	data: [number, number, number][][],
	total: number,
};

function weightedScore(data: [number, number, number]): number {
	return data[0] * 3 + data[1] - data[2] * 3;
}

function colorOfScore(data: [number, number, number], max: number): string {
	const weight = weightedScore(data);
	if (weight >= 0) {
		// eslint-disable-next-line no-mixed-operators
		const g = weight / max * 128 + 128;
		const o = 256 - g;
		return `rgb(${o}, ${g}, ${o})`;
	} else {
		// eslint-disable-next-line no-mixed-operators
		const g = -weight / max * 128 + 128;
		const o = 256 - g;
		return `rgb(${g}, ${o}, ${o})`;
	}
}

function ResultsPage() {
	const [state, setState] = useState<ResultsState>({ s: 'Loading' });

	const setSelected = useCallback((r: number, c: number) => {
		if (state.s !== 'Ready') { return; }
		setState({
			...state,
			selected: { row: r, col: c },
		});
	}, [state]);

	const notFound = useCallback(() => {
		window.document.title = `N/A - ${PRODUCT_NAME}`;
		setState({ s: 'Not Found' });
	}, []);

	const { id } = useRouter().query;
	useEffect(() => {
		if (id === undefined || Array.isArray(id)) {
			notFound();
			return;
		}

		const f = async () => {
			const result = await fetch(`${API_ENDPOINT}GetCoaster?id=${id}`);
			if (!result.ok) {
				notFound();
				return;
			}
			const data = await result.json() as QueryResult;
			window.document.title = `${data.name} Seat Map - ${PRODUCT_NAME}`;
			setState({ s: 'Ready', ...data, selected: null });
		};
		void f();
	}, [notFound, id]);

	const [minmax, maxVotes] = useMemo(() => {
		if (state.s !== 'Ready') { return [NaN, NaN]; }
		let mm = 6;
		let maxV = 0;
		state.data.forEach((row) => {
			row.forEach((v) => {
				const rr = Math.abs(weightedScore(v));
				if (rr > mm) {
					mm = rr;
				}
				const numV = v.reduce((a, x) => a + x);
				if (numV > maxV) { maxV = numV; }
			});
		});
		return [mm, maxV];
	}, [state]);

	const getSelectionDetails = useCallback((s: ResultsState) => {
		if (s.s !== 'Ready') { return null; }
		if (s.selected === null) { return null; }
		const r = s.selected.row;
		const c = s.selected.col;
		const d = s.data[r][c];
		const voteTotal = d.reduce((a, x) => a + x);
		const max = d.reduce((a, x) => (x > a ? x : a));
		const left = s.total - voteTotal;
		return <>
			<h2>Row {r + 1} &mdash; Seat {c + 1}</h2>
			<table>
				<tbody>
					{[['Love', '#2E7D32'], ['Like', '#0277BD'], ['Hate', '#C62828']].map((voteType, i) => {
						const v = d[i];
						return <tr key={voteType[0]}>
							<th>{voteType[0]}</th>
							<td><span style={{
								width: `${max === 0 ? 0 : (((v / maxVotes) * 100) / 2)}%`,
								backgroundColor: voteType[1],
							}}></span>{`${max === 0 ? 0 : (Math.round((v / voteTotal) * 100))}% (${v})`}</td>
						</tr>;
					})}
					<tr>
						<td colSpan={2}>{left} {left === 1 ? 'user' : 'users'} had no opinion</td>
					</tr>
				</tbody>
			</table>
		</>;
	}, [maxVotes]);

	return useCallback(() => {
		switch (state.s) {
		case 'Loading':
			return <div className={styles.load}><SyncLoader /></div>;
		case 'Not Found':
			return <div className={styles.load}>
				<h1 style={{ marginBottom: '20px' }}>Coaster Not Found :(</h1>
				<Link href='/contribute/newCoaster'><a className={btnStyle.bigBtn}>Why not add it?</a></Link>
			</div>;
		case 'Ready':
			if (id === undefined || Array.isArray(id)) {
				throw new Error();
			}
			return <main className={styles.main}>
				<h1>{state.name}</h1>
				<h2>{state.park}</h2>
				<Train
					rows={state.rows}
					cols={state.cols}
					render={(r, c) => <button
						style={{ backgroundColor: colorOfScore(state.data[r][c], minmax) }}
						onClick={() => setSelected(r, c)}
					></button>}
				/>
				<section className={styles.details}>
					{state.selected === null
						? <h2>Select a seat to see ratings</h2>
						: getSelectionDetails(state)
					}
					<Link href={`/contribute?id=${id}`}><a className={`${btnStyle.bigBtn} ${styles.voteBtn}`}>Vote on your favorite seats</a></Link>
				</section>
			</main>;
		default:
			return assertUnreachable(state);
		}
	}, [id, state, minmax, setSelected, getSelectionDetails])();
}

const Results: NextPage = () => (
	<>
		<Head>
			<title>Seat Map - {PRODUCT_NAME}</title>
			<meta name="description" content="Coaster seat map" />
		</Head>
		<Header />
		<ResultsPage />
		<Footer />
	</>
);

export default Results;
