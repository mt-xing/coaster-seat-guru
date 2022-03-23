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

/**
 * @param {string} token
 * @returns {string}
 */
function parseJwtSub(token) {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

	return JSON.parse(jsonPayload).sub;
}

/**
@typedef {{s: 'signin'} | {s: 'load', token: string} | {
	s: 'ready',
	token: string,
	name: string,
	park: string,
	rows: number,
	cols: number,
	selected: (number | undefined)[][]
} | {s: '404'} | {s: 'done'}} State
*/

function Contribution() {
	const [state, setState] = useState(/** @type {State} */({ s: 'signin' }));
	const [step, setStep] = useState(/** @type {1|2|3} */(1));
	const id = new URLSearchParams(window.location.search).get('id');
	const [submitting, setSubmitting] = useState(false);

	// @ts-ignore
	// eslint-disable-next-line no-undef
	React.useEffect(() => {
		switch (state.s) {
		case 'signin': {
			/** @param {Record<string, unknown>} response */
			const handleCredentialResponse = (response) => {
				const token = /** @type {string} */(response.credential);
				setState({ s: 'load', token });
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
			break;
		}
		case 'load': {
			const f = async () => {
				const endpoint = `https://coasterseatguru.azurewebsites.net/api/GetCoaster?id=${id}`;
				const result = await fetch(endpoint);
				if (!result.ok) {
					setState({ s: '404' });
					return;
				}
				const r = await result.json();
				console.log(r);
				const numRows = Array.from(Array(r.rows).keys());
				const numCols = Array.from(Array(r.cols).keys());
				setState({
					s: 'ready',
					token: state.token,
					name: r.name,
					park: r.park,
					rows: r.rows,
					cols: r.cols,
					selected: numRows.map((_r) => numCols.map(() => undefined)),
				});
			};
			f();
			break;
		}
		default: return;
		}
	}, [state]);

	/**
     * @param {number} r
     * @param {number} c
     * @param {number | undefined} val
     */
	function changeSelected(r, c, val) {
		if (state.s !== 'ready') { throw new Error(); }
		const t = state.selected.slice();
		t[r] = state.selected[r].slice();
		t[r][c] = val;
		setState({ ...state, selected: t });
	}

	switch (state.s) {
	case 'signin':
		return e(
			'div',
			{ className: 'signIn' },
			e('h1', null, 'Sign In'),
			e('div', { id: 'gbuttonDiv', className: 'signInBtn' }),
			e('p', null, 'This is my attempt to stop the same person from spamming multiple reviews on the same ride. I don\'t track anything from your Google account. If you have a better idea for how to do this, suggestions are welcome.'),
		);
	case 'load':
		return e('p', null, 'Loading...');
	case '404':
		return e('h1', null, 'Coaster not found :(');
	case 'ready': break;
	case 'done':
		return e('h1', null, 'Thank You!');
	default: (/** @param {never} x */(x) => { throw new Error(x); })(state);
	}

	async function submit() {
		if (state.s !== 'ready') { return; }
		if (submitting) { return; }
		setSubmitting(true);
		const r = await fetch(`https://coasterseatguru.azurewebsites.net/api/Vote?id=${id}&uid=${parseJwtSub(state.token)}`, {
			method: 'POST',
			body: JSON.stringify({
				token: state.token,
				votes: state.selected.map((row) => row.map((vote) => (vote === undefined ? null : vote))),
			}),
		});
		if (r.ok) {
			setState({ s: 'done' });
		}
	}

	/** @type {[string, string]} */
	const instrs = (() => {
		switch (step) {
		case 1:
			return ['Step 1: Select the seats you love', 'You just walked into an empty station and the op lets you pick your row.'];
		case 2:
			return ['Step 2: Select the seats you like', 'Your preferred seat is taken but you don\'t want to wait.'];
		case 3:
			return ['Step 3: Select the seats you hate', 'You\'d leave the line before sitting here.'];
		default:
			throw new Error();
		}
	})();

	const numRows = Array.from(Array(state.rows).keys());
	const numCols = Array.from(Array(state.cols).keys());
	return e(
		frag,
		null,
		e('h1', null, state.name),
		e('h2', null, state.park),
		e(
			'section',
			{ className: 'coaster' },
			e('p', null, 'Front of train'),
			e(
				'table',
				{ className: 'coasterTrain' },
				e('tbody', null, numRows.map((r) => e(
					'tr',
					{ key: r },
					e('td', null, `${r + 1}`),
					...numCols.map((c) => e(
						'td',
						{ key: c },
						state.selected[r][c] === undefined || state.selected[r][c] === step ? e(
							'input',
							{
								type: 'checkbox',
								checked: state.selected[r][c] === step,
								onChange: (/** @type {{ target: { checked: boolean; }; }} */ v) =>
									// eslint-disable-next-line implicit-arrow-linebreak
									changeSelected(r, c, v.target.checked ? step : undefined),
							},
						) : (() => {
							switch (state.selected[r][c]) {
							case 1:
								return '🟢';
							case 2:
								return '➕';
							case 3:
								return '⛔';
							default: throw new Error();
							}
						})(),
					)),
				))),
			),
		),
		e(
			'section',
			{ className: 'instr' },
			e('div', { className: 'progress' }, [1, 2, 3].map((s) => e('span', step === s ? { className: 'active', key: s } : { key: s }, `${s}`))),
			e('div', null, e('h2', null, instrs[0]), e('p', null, instrs[1])),
			e(
				'div',
				{ className: 'subInstr' },
				e('p', null, 'Select as many or as few seats as you want.'),
				e('p', null, 'If you haven\'t ridden in, have no opinion on, or just don\'t care about a seat, leave it unchecked.'),
			),
			e(
				'div',
				null,
				// @ts-ignore
				step !== 1 ? e('button', { className: 'bigBtn', onClick: () => setStep(step - 1) }, 'Back') : null,
				' ',
				// @ts-ignore
				step !== 3 ? e('button', { className: 'bigBtn', onClick: () => setStep(step + 1) }, 'Next') : null,
				step === 3 ? e('button', { className: !submitting ? 'bigBtn' : 'bigBtn disabled', onClick: submit }, 'Submit') : null,
			),
		),
	);
}

window.onload = () => {
	// @ts-ignore
	// eslint-disable-next-line no-undef
	ReactDOM.render(e(Contribution), document.getElementById('main'));
};
