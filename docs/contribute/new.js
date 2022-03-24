// eslint-disable-next-line max-len
/** @type {(element: unknown, props?: null | Record<string, unknown>, ...children: unknown[]) => void} */
// @ts-ignore
// eslint-disable-next-line no-undef
const e = React.createElement;
/** @type {unknown} */
// @ts-ignore
// eslint-disable-next-line no-undef
const frag = React.Fragment;
/** @type {<T>(v: T) => [x: T, setX: (xx: T) => void]} */
// @ts-ignore
// eslint-disable-next-line no-undef, prefer-destructuring
const useState = React.useState;
/** @type {(callback: (...x: unknown[]) => void, capture: unknown[]) => void} */
// @ts-ignore
// eslint-disable-next-line no-undef, prefer-destructuring
const useCallback = React.useCallback;

const fakeNames = [
	{ name: 'Angry 326', park: 'Dakotawinds' },
	{ name: 'Steel Retaliation', park: 'Cedar Tip' },
	{ name: 'Z3', park: 'Five Banners Magic Hill' },
	{ name: 'Mystic Wood', park: 'King\'s Isle' },
];
const fakeName = fakeNames[Math.floor(Math.random() * fakeNames.length)];

function Contribution() {
	const [state, setState] = useState(false);

	const [name, setName] = useState('');
	const [park, setPark] = useState('');
	const [rcdb, setRcdb] = useState('');
	const [rows, setRows] = useState(0);
	const [cols, setCols] = useState(0);

	const [token, setToken] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const setColsSafe = useCallback((v) => {
		// @ts-ignore
		const val = Math.floor(v.target.value);
		if (val < 0 || val > 100) {
			return;
		}
		setCols(val);
	}, [setCols]);
	const setRowsSafe = useCallback((v) => {
		// @ts-ignore
		const val = Math.floor(v.target.value);
		if (val < 0 || val > 100) {
			return;
		}
		setRows(val);
	}, [setRows]);

	async function submit() {
		if (submitting) { return; }
		setSubmitting(true);
		const rcdbMatch = /http(?:s?):\/\/rcdb.com\/([\d]+)\.htm/.exec(rcdb);
		if (rcdbMatch === null) {
			return;
		}
		const r = await fetch(`https://coasterseatguru.azurewebsites.net/api/CreateCoaster?id=${rcdbMatch[1]}`, {
			method: 'POST',
			body: JSON.stringify({
				token,
				rcdb,
				name,
				park,
				rows,
				cols,
			}),
		});
		if (r.ok) {
			window.location.replace(`/results?id=${rcdbMatch[1]}`);
		}
	}

	// @ts-ignore
	// eslint-disable-next-line no-undef
	React.useEffect(() => {
		if (!state) {
			const currentToken = window.sessionStorage.getItem('oauthToken');
			if (currentToken !== null) {
				const tokenInfo = JSON.parse(currentToken);
				if (tokenInfo.time > new Date().getTime()) {
					setToken(tokenInfo.token);
					setState(true);
				}
			}

			/** @param {Record<string, unknown>} response */
			const handleCredentialResponse = (response) => {
				// @ts-ignore
				setToken(response.credential);
				window.sessionStorage.setItem('oauthToken', JSON.stringify({
					time: new Date().getTime() + 30 * 60 * 1000, // 30 min * 60 sec / min * 1000 ms / sec
					token: response.credential,
				}));
				setState(true);
			};
			// @ts-ignore
			// eslint-disable-next-line no-undef
			google.accounts.id.initialize({
				client_id: '707815788715-v292qtutlmval10742tekpbnv2a6to6l.apps.googleusercontent.com',
				callback: handleCredentialResponse,
			});
			// @ts-ignore
			// eslint-disable-next-line no-undef
			google.accounts.id.renderButton(
				document.getElementById('gbuttonDiv'),
				{ theme: 'outline', size: 'large' }, // customization attributes
			);
		}
	}, [state]);

	if (!state) {
		return e(
			'div',
			{ className: 'signIn' },
			e('h1', null, 'Sign In'),
			e('div', { id: 'gbuttonDiv', className: 'signInBtn' }),
			e('p', null, 'This is my attempt to stop the same person from spamming multiple reviews on the same ride. I don\'t track anything from your Google account. If you have a better idea for how to do this, suggestions are welcome.'),
		);
	}

	const ready = !submitting && name !== '' && park !== '' && rcdb !== '' && /http(?:s?):\/\/rcdb.com\/[\d]+\.htm/.test(rcdb) && rows > 0 && cols > 0;

	return e(
		frag,
		null,
		e('h1', null, 'New Coaster'),
		e('p', null, 'Thanks for making this site better.'),
		e('p', null, e('label', null, 'Coaster Name: ', e('input', {
			type: 'text', placeholder: fakeName.name, value: name, onChange: (/** @type {{ target: { value: string; }; }} */ v) => setName(v.target.value),
		}))),
		e('p', null, e('label', null, 'Park Name: ', e('input', {
			type: 'text', placeholder: fakeName.park, value: park, onChange: (/** @type {{ target: { value: string; }; }} */ v) => setPark(v.target.value),
		}))),
		e('p', null, e('label', null, 'RCDB Link: ', e('input', {
			type: 'text', placeholder: 'https://rcdb.com/???.html', value: rcdb, onChange: (/** @type {{ target: { value: string; }; }} */ v) => setRcdb(v.target.value),
		}))),
		e('p', null, e('label', null, 'Rows per Train: ', e('input', {
			type: 'number', min: 0, max: 100, value: rows, onChange: setRowsSafe,
		}))),
		e('p', null, e('label', null, 'Seats per Row: ', e('input', {
			type: 'number', min: 0, max: 100, value: cols, onChange: setColsSafe,
		}))),
		e('p', null, 'My site currently only supports rectangular layouts. If a train has a more esoteric design, please let me know.'),
		e('p', null, e('button', { className: ready ? 'bigBtn' : 'bigBtn disabled', onClick: submit }, 'Submit')),
	);
}

window.onload = () => {
	// @ts-ignore
	// eslint-disable-next-line no-undef
	ReactDOM.render(e(Contribution), document.getElementById('main'));
};
