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

function Contribution() {
	const [state, setState] = useState(/** @type {'ready' | 'signin' | 'load'} */('signin'));
	const [step, setStep] = useState(/** @type {1|2|3} */(1));
	const numRows = Array.from(Array(8).keys());
	const numCols = Array.from(Array(4).keys());
	const [selected, setSelected] = useState(
		numRows.map((r) => numCols.map(/** @return {number | undefined} */() => undefined)),
	);

	// @ts-ignore
	// eslint-disable-next-line no-undef
	React.useEffect(() => {
		switch (state) {
		case 'signin': {
			/** @param {Record<string, unknown>} response */
			const handleCredentialResponse = (response) => {
				const token = response.credential;
				setState('load');
			};
			// @ts-ignore
			// eslint-disable-next-line no-undef
			google.accounts.id.initialize({
				client_id: '576763212029-fsd49s3dgcnmrpm2rcgovfkvlkhp8ube.apps.googleusercontent.com',
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
			// TODO
			window.setTimeout(() => setState('ready'), 1000);
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
		const t = selected.slice();
		t[r] = selected[r].slice();
		t[r][c] = val;
		setSelected(t);
	}

	if (state === 'signin') {
		return e(
			'div',
			{ className: 'signIn' },
			e('h1', null, 'Sign In'),
			e('div', { id: 'gbuttonDiv', className: 'signInBtn' }),
			e('p', null, 'This is my attempt to stop the same person from spamming the multiple reviews on the same ride. I don\'t track anything from your Google account. If you have a better idea for how to do this, suggestions are welcome.'),
		);
	}

	if (state === 'load') {
		return e('p', null, 'Loading...');
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

	return e(
		frag,
		null,
		e('h1', null, 'Fury 325'),
		e('h2', null, 'Carowinds'),
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
						selected[r][c] === undefined || selected[r][c] === step ? e(
							'input',
							{
								type: 'checkbox',
								checked: selected[r][c] === step,
								onChange: (/** @type {{ target: { checked: boolean; }; }} */ v) =>
									// eslint-disable-next-line implicit-arrow-linebreak
									changeSelected(r, c, v.target.checked ? step : undefined),
							},
						) : (() => {
							switch (selected[r][c]) {
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
				step === 3 ? e('button', { className: 'bigBtn' }, 'Submit') : null,
			),
		),
	);
}

window.onload = () => {
	// @ts-ignore
	// eslint-disable-next-line no-undef
	ReactDOM.render(e(Contribution), document.getElementById('main'));
};
