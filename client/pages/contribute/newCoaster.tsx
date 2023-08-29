import type { NextPage } from 'next';
import Head from 'next/head';
import {
	useCallback, useEffect, useMemo, useState
} from 'react';
import Link from 'next/link';
import { CreateCoasterPayload } from '@apiTypes/createCoaster';
import { CarShape } from '@apiTypes/cosmos';
import TrainEditor from 'components/trainEditor';
import Header from '../../components/header';
import { assertUnreachable } from '../../utils/assert';
import { API_ENDPOINT, CLIENT_ID, PRODUCT_NAME } from '../../utils/consts';
import styles from '../../styles/NewCoaster.module.css';
import btnStyle from '../../styles/BigButton.module.css';
import { getAuth, storeAuth } from '../../utils/auth';
import AuthWrapper from '../../components/authWrapper';
import AuthBlocker from '../../components/authBlocker';

const fakeNames = [
	{ name: 'Angry 326', park: 'Dakotawinds' },
	{ name: 'Steel Retaliation', park: 'Cedar Tip' },
	{ name: 'Z3', park: 'Five Banners Magic Hill' },
	{ name: 'Mystic Wood', park: 'King\'s Isle' },
];
const fakeName = fakeNames[Math.floor(Math.random() * fakeNames.length)];

const rcdbPattern = /http(?:s?):\/\/rcdb.com\/([\d]+)\.htm/;

type ResultsState = {
	s: 'Unauthenticated',
} | {
	s: 'Ready',
	token: string,
	submitting: boolean,
} | {
	s: 'Done',
	id: string,
} | {
	s: 'Error',
	msg: string,
};

declare const google: {
	accounts: {
		id: {
			initialize: (x: unknown) => void,
			renderButton: (x: unknown, y: unknown) => void,
		}
	}
};

function SubmitCoasterPage() {
	const [state, setState] = useState<ResultsState>({ s: 'Unauthenticated' });

	const [name, setName] = useState('');
	const [park, setPark] = useState('');
	const [rcdb, setRcdb] = useState('');
	const [editTrain, setEditTrain] = useState(false);

	const handleCredentialResponse = useCallback((response: {credential: string}) => {
		const token = response.credential;
		storeAuth(token);
		setState({ s: 'Ready', token, submitting: false });
	}, []);

	useEffect(() => {
		switch (state.s) {
		case 'Unauthenticated': {
			const currentToken = getAuth();
			if (currentToken !== null) {
				setState({ s: 'Ready', token: currentToken, submitting: false });
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
		default:
			break;
		}
	}, [state, handleCredentialResponse]);

	const proceed = useCallback(() => setEditTrain(true), []);

	const submit = useCallback((
		rows: number,
		cols: number,
		rowsPerCar: number | number[],
		carDesign: CarShape | CarShape[],
		spacings: boolean[][],
	) => {
		if (state.s !== 'Ready') { return; }
		if (state.submitting) { return; }
		const rcdbMatch = rcdbPattern.exec(rcdb);
		if (rcdbMatch === null) {
			return;
		}
		const id = rcdbMatch[1];
		const { token } = state;
		setState({ ...state, submitting: true });
		void (async () => {
			const body: CreateCoasterPayload = {
				token,
				rcdb,
				name,
				park,
				rows,
				cols,
				rowsPerCar,
				carDesign,
				spacings,
			};
			const r = await fetch(`${API_ENDPOINT}createCoaster?id=${id}`, {
				method: 'POST',
				body: JSON.stringify(body),
			});
			if (r.ok) {
				setState({ s: 'Done', id });
			} else {
				setState({ s: 'Error', msg: 'Sorry, an error occurred' });
			}
		})();
	}, [state, name, park, rcdb]);

	const canSubmit = useMemo(() => {
		if (state.s !== 'Ready' || state.submitting) { return false; }
		if (name === '' || park === '' || rcdb === '') { return false; }
		return rcdbPattern.test(rcdb);
	}, [state, name, park, rcdb]);

	// eslint-disable-next-line no-restricted-globals
	const reload = useCallback(() => location.reload(), []);

	return useCallback(() => {
		switch (state.s) {
		case 'Unauthenticated':
			return <AuthBlocker />;
		case 'Ready':
			if (editTrain) {
				return <main className={styles.main}>
					<h1>Train Editor</h1>
					<h2>{name} - {park}</h2>
					<TrainEditor
						allowRowEdit={true}
						complete={submit}
					/>
				</main>;
			}
			return <main className={styles.main}>
				<h1>New Coaster</h1>
				<p>Thanks for making this site better.</p>
				<p><label>
					{'Coaster Name: '}
					<input type='text' placeholder={fakeName.name} value={name} onChange={(v) => setName(v.target.value)} />
				</label></p>
				<p><label>
					{'Park Name: '}
					<input type='text' placeholder={fakeName.park} value={park} onChange={(v) => setPark(v.target.value)} />
				</label></p>
				<p><label>
					{'RCDB Link: '}
					<input type='text' placeholder='https://rcdb.com/???.html' value={rcdb} onChange={(v) => setRcdb(v.target.value)} />
				</label></p>
				<p>
					<button
						className={btnStyle.bigBtn}
						disabled={!canSubmit}
						onClick={proceed}
					>Next</button>
				</p>
			</main>;
		case 'Done':
			return <div className={styles.load}>
				<h1>Thank You!</h1>
				<Link href={`/results?id=${state.id}`}><a className={btnStyle.bigBtn}>Go to coaster</a></Link>
			</div>;
		case 'Error':
			return <div className={styles.load}>
				<h1>Something Went Wrong :(</h1>
				<h2>{state.msg}</h2>
				<button className={btnStyle.bigBtn} onClick={reload}>Try again</button>
			</div>;
		default:
			return assertUnreachable(state);
		}
	}, [state, reload, name, park, rcdb, canSubmit, proceed, submit, editTrain])();
}

const SubmitCoaster: NextPage = () => (
	<>
		<Head>
			<title>Submit Coaster - {PRODUCT_NAME}</title>
			<meta name="description" content="Submit a new coaster" />
		</Head>
		<Header />
		<AuthWrapper page={<SubmitCoasterPage />} />
	</>
);

export default SubmitCoaster;
