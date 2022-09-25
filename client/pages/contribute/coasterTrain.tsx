import type { NextPage } from 'next';
import Head from 'next/head';
import {
	useCallback, useEffect, useState
} from 'react';
import { SyncLoader } from 'react-spinners';
import Link from 'next/link';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { VotePayload } from '@apiTypes/vote';
import { GetCoasterResponse as QueryResult } from '@apiTypes/getCoaster';
import TrainEditor from 'components/trainEditor';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { assertUnreachable } from '../../utils/assert';
import { API_ENDPOINT, CLIENT_ID, PRODUCT_NAME } from '../../utils/consts';
import styles from '../../styles/Contribute.module.css';
import btnStyle from '../../styles/BigButton.module.css';
import { getAuth, storeAuth } from '../../utils/auth';
import AuthWrapper from '../../components/authWrapper';
import AuthBlocker from '../../components/authBlocker';

type ResultsState = {
	s: 'Unauthenticated',
} | {
	s: 'Loading',
	token: string,
} | {
	s: 'Not Found',
} | {
	s: 'Already Exists',
	id: string,
} | ({
	s: 'Ready',
	token: string,
	submitting: boolean,
} & QueryResult) | {
	s: 'Done',
	id: string,
} | {
	s: 'Error',
};

declare const google: {
	accounts: {
		id: {
			initialize: (x: unknown) => void,
			renderButton: (x: unknown, y: unknown) => void,
		}
	}
};

function TrainPage() {
	const [state, setState] = useState<ResultsState>({ s: 'Unauthenticated' });

	const notFound = useCallback(() => {
		window.document.title = `N/A - ${PRODUCT_NAME}`;
		setState({ s: 'Not Found' });
	}, []);

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
				const result = await fetch(`${API_ENDPOINT}GetCoaster?id=${id}`);
				if (!result.ok) {
					notFound();
					return;
				}
				const r = await result.json() as QueryResult;
				if (r.rowsPerCar && r.carDesign && r.spacings) {
					setState({ s: 'Already Exists', id: r.id });
					return;
				}
				setState({
					s: 'Ready',
					token: state.token,
					submitting: false,
					...r,
				});
			};
			void f();
			break;
		}
		default:
			break;
		}
	}, [state, handleCredentialResponse, id, notFound, idReady]);

	const submit = useCallback(() => {
		if (state.s !== 'Ready') { return; }
		if (state.submitting) { return; }
		// setState({ ...state, submitting: true });
		// void (async () => {
		// 	const body: VotePayload = {
		// 		token: state.token,
		// 		votes: [],
		// 	};
		// 	const r = await fetch(`${API_ENDPOINT}Vote?id=${state.id}&uid=${jwtDecode<{sub: string}>(state.token).sub}`, {
		// 		method: 'POST',
		// 		body: JSON.stringify(body),
		// 	});
		// 	if (r.ok) {
		// 		setState({ s: 'Done', id: state.id });
		// 	} else {
		// 		setState({ s: 'Error' });
		// 	}
		// })();
	}, [state]);

	// eslint-disable-next-line no-restricted-globals
	const reload = useCallback(() => location.reload(), []);

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
				<TrainEditor
					complete={submit}
					initialRows={state.rows}
					initialCols={state.cols}
					allowRowEdit={false} />
			</main>;
		case 'Done':
			return <div className={styles.load}>
				<h1>Thank You!</h1>
				<Link href={`/results?id=${state.id}`}><a className={btnStyle.bigBtn}>Back to coaster</a></Link>
			</div>;
		case 'Error':
			return <div className={styles.load}>
				<h1>Something Went Wrong :(</h1>
				<button className={btnStyle.bigBtn} onClick={reload}>Try again</button>
			</div>;
		case 'Already Exists':
			return <div className={styles.load}>
				<h1>Invalid</h1>
				<p>This coaster already has train data</p>
				<Link href={`/results?id=${state.id}`}><a className={btnStyle.bigBtn}>Back to coaster</a></Link>
			</div>;
		default:
			return assertUnreachable(state);
		}
	}, [state, submit, reload])();
}

const CoasterTrain: NextPage = () => (
	<>
		<Head>
			<title>Edit Train - {PRODUCT_NAME}</title>
			<meta name="description" content="Vote on a coaster's seats" />
		</Head>
		<Header />
		<AuthWrapper page={<TrainPage />} />
		<Footer isDark={false} />
	</>
);

export default CoasterTrain;
