import type { NextPage } from 'next';
import Head from 'next/head';
import {
	useCallback, useEffect, useState
} from 'react';
import { SyncLoader } from 'react-spinners';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetCoasterResponse as QueryResult } from '@apiTypes/getCoaster';
import DisplayTrain from 'components/displayTrain';
import ReactSwitch from 'react-switch';
import useWindowWidth from 'model/useWindowWidth';
import Header from '../components/header';
import { assertUnreachable } from '../utils/assert';
import { API_ENDPOINT, PRODUCT_NAME } from '../utils/consts';
import styles from '../styles/Results.module.css';
import HeatMap from '../model/heatmap';

type ResultsState = {
	s: 'Loading',
} | {
	s: 'Not Found',
} | ({
	s: 'Ready',
	selected: { row: number, col: number } | null,
	heatmap: HeatMap,
} & QueryResult);

const minWrapperWidth = 450;

function ResultsPage() {
	const [state, setState] = useState<ResultsState>({ s: 'Loading' });
	const [accessible, setAccessible] = useState<boolean>(false);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('accessible') === 'on') {
				setAccessible(true);
			}
		}
	}, []);
	const toggleAccessible = useCallback((c: boolean) => {
		setAccessible(c);
		if (c) {
			localStorage.setItem('accessible', 'on');
		} else {
			localStorage.removeItem('accessible');
		}
	}, []);

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

	const [trainWidth, setTrainWidth] = useState<number | undefined>();
	const windowWidth = useWindowWidth();
	const narrowDesign = !!trainWidth && (trainWidth + minWrapperWidth > windowWidth);

	const router = useRouter();
	const { id } = router.query;
	const idReady = router.isReady;

	useEffect(() => {
		if (!idReady) { return; }
		if (id === undefined || Array.isArray(id)) {
			notFound();
			return;
		}

		const f = async () => {
			const result = await fetch(`${API_ENDPOINT}getCoaster?id=${id}`);
			if (!result.ok) {
				notFound();
				return;
			}
			const data = await result.json() as QueryResult;
			window.document.title = `${data.name} Seat Map - ${PRODUCT_NAME}`;
			setState({
				s: 'Ready', ...data, selected: null, heatmap: new HeatMap(data.data)
			});
		};
		void f();
	}, [notFound, id, idReady]);

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
								width: `${max === 0 ? 0 : (((v / s.heatmap.maximumVotes) * 100) / 2)}%`,
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
	}, []);

	const blankSeat = useCallback(() => <div
		className='seat'
		style={{
			height: '30px',
			width: '30px',
			margin: '0 5px',
			display: 'inline-block',
			verticalAlign: 'middle'
		}}
	></div>, []);

	return useCallback(() => {
		switch (state.s) {
		case 'Loading':
			return <div className={styles.load}><SyncLoader color="white" /></div>;
		case 'Not Found':
			return <div className={styles.load}>
				<h1 style={{ marginBottom: '20px' }}>Coaster Not Found :(</h1>
				<p>Like Six Flags&apos; corporate strategy, this coaster doesn&apos;t seem to exist.</p>
				<Link href='/contribute/newCoaster'>Why not add it?</Link>
			</div>;
		case 'Ready':
			if (id === undefined || Array.isArray(id)) {
				throw new Error();
			}
			return <><main className={`${styles.main} ${trainWidth ? styles.sideTrain : styles.normalTrain}${narrowDesign ? ` ${styles.narrow}` : ''}`}>
				<div className={styles.trainWrap}>
					<DisplayTrain
						key={id}
						rows={state.rows}
						cols={state.cols}
						render={(r, c) => <button
							aria-label={`Row ${r + 1}, Seat ${c + 1}`}
							style={{
								backgroundColor: state.heatmap.colorOfScore(state.data[r][c])
							}}
							onClick={() => setSelected(r, c)}
							className={`${styles.seat}${
								state.selected?.row === r && state.selected?.col === c ? ` ${styles.selected}` : ''
							}`}
						>
							<div className={styles.selected} />
							{accessible ? (
								<span className={styles.accessibleScore}>{
									state.heatmap.accessibleScore(state.data[r][c])
								}</span>) : null}
						</button>}
						renderGap={blankSeat}
						carDesign={state.carDesign}
						spacings={state.spacings}
						rowsPerCar={state.rowsPerCar}
						onResizeCallback={setTrainWidth}
					/>
				</div>

				<div className={styles.boxWrap}>

					<section className={styles.infoWrap} lang="en">
						<h1>{state.name}</h1>
						<h2>{state.park}</h2>
						<p><Link href={`/contribute?id=${id}`}><a className={styles.voteBtn}>Add your vote 🢂</a></Link></p>
					</section>

					<section className={styles.detailsWrap}>
						{state.selected === null
							? <h2>Select a seat to see ratings</h2>
							: getSelectionDetails(state)
						}
					</section>

				</div>
			</main>
			<div className={styles.bottomWrap}>
				<p>
					The seat map above shows the layout,
					to the best of my knowledge,
					of {state.name} at {state.park}.
				</p>
				<p>{state.total} {state.total === 1 ? 'person has' : 'people have'} voted on this coaster.</p>
				<p><Link href={`/contribute?id=${id}`}><a className={styles.voteBtn}>Add your opinion too 🢂</a></Link></p>
				{
					!state.carDesign || !state.spacings || !state.rowsPerCar
						? <>
							<p>Incidentally, I don&apos;t actually know the
								layout of this coaster&apos;s train :(</p>
							<p><Link href={`/contribute/coasterTrain?id=${id}`}><a className={styles.voteBtn}>Would you like to add it?</a></Link></p>
						</>
						: null
				}
				<div>
					<label>
						Having trouble seeing the colors? Try text mode:
						<ReactSwitch
							onChange={toggleAccessible}
							checked={accessible}
							className={styles.accToggle}
							onColor='#03045E'
						/>
					</label>
				</div>
				{
					accessible ? <p style={{ marginLeft: '50px' }}>
						++ (beloved), + (liked), ⇎ (controversial), − (disliked), −− (hated)
					</p> : null
				}
				<p className={styles.contactMsg}>
					If something is wrong with this page, please let me know on <a href='https://github.com/mt-xing/coaster-seat-guru/issues'>GitHub</a>.
				</p>
			</div></>;
		default:
			return assertUnreachable(state);
		}
	}, [
		id, state, setSelected, getSelectionDetails, blankSeat, accessible,
		toggleAccessible, trainWidth, narrowDesign
	])();
}

const Results: NextPage = () => {
	const router = useRouter();
	return (
		<div className={styles.pageWrap}>
			<Head>
				<title>Seat Map - {PRODUCT_NAME}</title>
				<meta name="description" content="Coaster seat map" />
				<link rel="canonical" href={`https://coasterseatguru.com/results/?id=${router.query.id?.toString() ?? ''}`} />
			</Head>
			<Header noBg={true} />
			<ResultsPage />
		</div>
	);
};

export default Results;
