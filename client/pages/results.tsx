import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '../components/footer';
import Header from '../components/header';
import { assertUnreachable } from '../utils/assert';
import { API_ENDPOINT, PRODUCT_NAME } from '../utils/consts';
import styles from '../styles/Results.module.css';
import btnStyle from '../styles/BigButton.module.css';

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

	const render = useCallback(() => {
		switch (state.s) {
		case 'Loading':
			return <div className={styles.load}><SyncLoader /></div>;
		case 'Not Found':
			return <div className={styles.load}>
				<h1 style={{ marginBottom: '20px' }}>Coaster Not Found :(</h1>
				<Link href='/contribute/newCoaster'><a className={btnStyle.bigBtn}>Why not add it?</a></Link>
			</div>;
		case 'Ready':
			return <></>;
		default:
			return assertUnreachable(state);
		}
	}, [state]);

	return render();
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
