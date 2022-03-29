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
			setState({ s: 'Ready', ...data });
		};
		void f();
	}, [notFound, id]);

	const minmax = useMemo(() => {
		if (state.s !== 'Ready') { return NaN; }
		let mm = 6;
		state.data.forEach((row) => {
			row.forEach((v) => {
				const rr = Math.abs(weightedScore(v));
				if (rr > mm) {
					mm = rr;
				}
			});
		});
		return mm;
	}, [state]);

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
			return <>
				<h1>{state.name}</h1>
				<h2>{state.park}</h2>
				<Train
					rows={state.rows}
					cols={state.cols}
					render={(r, c) => <button style={
						{ backgroundColor: colorOfScore(state.data[r][c], minmax) }
					}></button>}
				/>
			</>;
		default:
			return assertUnreachable(state);
		}
	}, [state, minmax])();
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
