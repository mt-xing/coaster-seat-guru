import type { NextPage } from 'next';
import Head from 'next/head';
import {
	useCallback, useEffect, useMemo, useState
} from 'react';
import { SyncLoader } from 'react-spinners';
import Link from 'next/link';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { VotePayload } from '@apiTypes/vote';
import { GetCoasterResponse as QueryResult } from '@apiTypes/getCoaster';
import { CarShape } from '@apiTypes/cosmos';
import Header from '../../components/header';
import { assertUnreachable } from '../../utils/assert';
import { API_ENDPOINT, CLIENT_ID, PRODUCT_NAME } from '../../utils/consts';
import styles from '../../styles/Contribute.module.css';
import btnStyle from '../../styles/BigButton.module.css';
import Train from '../../components/train';
import { getAuth, storeAuth } from '../../utils/auth';
import AuthWrapper from '../../components/authWrapper';
import AuthBlocker from '../../components/authBlocker';

type Step = 1 | 2 | 3;

type ResultsState = {
	s: 'Unauthenticated',
} | {
	s: 'Loading',
	token: string,
} | {
	s: 'Not Found',
} | ({
	s: 'Ready',
	token: string,
	step: Step,
	selected: (Step | undefined)[][],
	submitting: boolean,
} & UsefulQueryResult) | {
	s: 'Done',
	id: string,
} | {
	s: 'Error',
};

type UsefulQueryResult = {
	id: string,
	name: string,
	park: string,
	rows: number,
	cols: number,
	spacings?: boolean[][],
	carDesign?: CarShape | CarShape[],
	rowsPerCar?: number | number[],
};

declare const google: {
	accounts: {
		id: {
			initialize: (x: unknown) => void,
			renderButton: (x: unknown, y: unknown) => void,
		}
	}
};

function VotePage() {
	const [state, setState] = useState<ResultsState>({ s: 'Unauthenticated' });

	const notFound = useCallback(() => {
		window.document.title = `N/A - ${PRODUCT_NAME}`;
		setState({ s: 'Not Found' });
	}, []);

	const setStep = useCallback((step: Step) => {
		if (state.s !== 'Ready') { return; }
		setState({ ...state, step });
	}, [state]);

	const router = useRouter();
	const { id } = router.query;
	const idReady = router.isReady;

	const handleCredentialResponse = useCallback((response: {credential: string}) => {
		const token = response.credential;
		storeAuth(token);
		setState({ s: 'Loading', token });
	}, []);

	useEffect(() => {
		switch (state.s) {
		case 'Unauthenticated': {
			const currentToken = getAuth();
			if (currentToken !== null) {
				setState({ s: 'Loading', token: currentToken });
				return;
			}
			google.accounts.id.initialize({
				client_id: CLIENT_ID,
				callback: handleCredentialResponse
			});
			google.accounts.id.renderButton(
				document.getElementById('gbuttonDiv'),
				{ theme: 'outline', size: 'large' }
			);
			break;
		}
		case 'Loading': {
			const f = async () => {
				if (!idReady) { return; }
				if (id === undefined || Array.isArray(id)) {
					notFound();
					return;
				}
				const result = await fetch(`${API_ENDPOINT}getCoaster?id=${id}`);
				if (!result.ok) {
					notFound();
					return;
				}
				const r = await result.json() as QueryResult;
				const numRows = Array.from(Array(r.rows).keys());
				const numCols = Array.from(Array(r.cols).keys());
				setState({
					s: 'Ready',
					token: state.token,
					id: r.id,
					name: r.name,
					park: r.park,
					rows: r.rows,
					cols: r.cols,
					selected: numRows.map(() => numCols.map(() => undefined)),
					step: 1,
					submitting: false,

					spacings: r.spacings,
					rowsPerCar: r.rowsPerCar,
					carDesign: r.carDesign,
				});
			};
			void f();
			break;
		}
		default:
			break;
		}
	}, [state, handleCredentialResponse, id, notFound, idReady]);

	const changeSelected = useCallback((r: number, c: number, val: Step | undefined) => {
		if (state.s !== 'Ready') { throw new Error(); }
		const t = state.selected.slice();
		t[r] = state.selected[r].slice();
		t[r][c] = val;
		setState({ ...state, selected: t });
	}, [state]);

	const instrs = useMemo(() => {
		if (state.s !== 'Ready') { return ['', '']; }
		switch (state.step) {
		case 1:
			return ['Step 1: Select the seats you love', 'You just walked into an empty station and the op lets you pick your row.'];
		case 2:
			return ['Step 2: Select the seats you like', 'Your preferred seat is taken but you don\'t want to wait.'];
		case 3:
			return ['Step 3: Select the seats you hate', 'You\'d leave the line before sitting here.'];
		default:
			return assertUnreachable(state.step);
		}
	}, [state]);

	const submit = useCallback(() => {
		if (state.s !== 'Ready') { return; }
		if (state.submitting) { return; }
		setState({ ...state, submitting: true });
		void (async () => {
			const body: VotePayload = {
				token: state.token,
				votes: state.selected.map((row) => row.map((vote) => (vote === undefined ? null : vote))),
			};
			const r = await fetch(`${API_ENDPOINT}Vote?id=${state.id}&uid=${jwtDecode<{sub: string}>(state.token).sub}`, {
				method: 'POST',
				body: JSON.stringify(body),
			});
			if (r.ok) {
				setState({ s: 'Done', id: state.id });
			} else {
				setState({ s: 'Error' });
			}
		})();
	}, [state]);

	// eslint-disable-next-line no-restricted-globals
	const reload = useCallback(() => location.reload(), []);

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
		case 'Unauthenticated':
			return <AuthBlocker />;
		case 'Loading':
			return <div className={styles.load}><SyncLoader /></div>;
		case 'Not Found':
			return <div className={styles.load}>
				<h1>Coaster Not Found :(</h1>
				<Link href='/contribute/newCoaster'><a className={btnStyle.bigBtn}>Why not add it?</a></Link>
			</div>;
		case 'Ready':
			return <main className={styles.main}>
				<h1>{state.name}</h1>
				<h2>{state.park}</h2>
				<Train
					rows={state.rows}
					cols={state.cols}
					carDesign={state.carDesign}
					rowsPerCar={state.rowsPerCar}
					spacings={state.spacings}
					render={(r, c) => {
						if (state.selected[r][c] === undefined || state.selected[r][c] === state.step) {
							return <input
								type='checkbox'
								checked={state.selected[r][c] === state.step}
								onChange={(v) => changeSelected(r, c, v.target.checked ? state.step : undefined)}
								style={{ margin: '0 5px' }}
							/>;
						}
						return <span style={{ margin: '0 5px', width: '30px', display: 'inline-block' }}>
							{getIcon(state.selected[r][c])}
						</span>;
					}}
					renderGap={blankSeat}
				/>
				<section className={styles.details}>
					<div className={styles.progress}>
						{[1, 2, 3].map((step) => <span key={step} className={state.step === step ? styles.active : ''}>{step}</span>)}
					</div>
					<div>
						<h2>{instrs[0]}</h2>
						<p>{instrs[1]}</p>
					</div>
					<div className={styles.subInstr}>
						<p>Select as many or as few seats as you want.</p>
						<p>
							If you haven&apos;t ridden in, have no opinion on,
							or just don&apos;t care about a seat, leave it unchecked.
						</p>
						<p>
							If you previously voted on this coaster,
							your prior vote will be replaced.
						</p>
					</div>
					<div>
						{state.step === 1
							? null
							: <button
								className={btnStyle.bigBtn}
								onClick={() => setStep((state.step - 1) as 1 | 2)}
							>Back</button>
						}
						{' '}
						{state.step === 3
							? null
							: <button
								className={btnStyle.bigBtn}
								onClick={() => setStep((state.step + 1) as 2 | 3)}
							>Next</button>
						}
						{' '}
						{state.step !== 3
							? null
							: <button
								className={btnStyle.bigBtn}
								disabled={state.submitting}
								onClick={submit}
							>Submit</button>
						}
					</div>
				</section>
			</main>;
		case 'Done':
			return <div className={styles.load}>
				<h1>Thank You!</h1>
				<Link href={`/results?id=${state.id}`}><a className={btnStyle.bigBtn}>Go to coaster</a></Link>
			</div>;
		case 'Error':
			return <div className={styles.load}>
				<h1>Something Went Wrong :(</h1>
				<button className={btnStyle.bigBtn} onClick={reload}>Try again</button>
			</div>;
		default:
			return assertUnreachable(state);
		}
	}, [state, changeSelected, instrs, setStep, submit, reload, blankSeat])();
}

const Contribute: NextPage = () => (
	<>
		<Head>
			<title>Submit Vote - {PRODUCT_NAME}</title>
			<meta name="description" content="Vote on a coaster's seats" />
		</Head>
		<Header />
		<AuthWrapper page={<VotePage />} />
	</>
);

const getIcon = (s: Step | undefined) => {
	switch (s) {
	case 1:
		return '🟢';
	case 2:
		return '➕';
	case 3:
		return '⛔';
	default: throw new Error();
	}
};

export default Contribute;
