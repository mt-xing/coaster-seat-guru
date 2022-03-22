window.onload = () => {
	const id = new URLSearchParams(window.location.search).get('id');
	if (id === null) {
		notFound();
		return;
	}
	// TODO
	populate(
		3,
		'Fury 325',
		'Carowinds',
		8,
		4,
		[[[6, 2, 1], [6, 1, 1], [6, 0, 1], [6, 3, 1]], [[2, 2, 1], [2, 1, 1], [3, 0, 1], [2, 3, 1]]],
		10,
	);
};

function notFound() {
	const h = document.getElementById('pageHeader');
	if (h === null) { return; }
	h.textContent = 'Coaster Not Found';

	const p = document.body.appendChild(document.createElement('p'));
	const a = p.appendChild(document.createElement('a'));
	a.href = '/contribute/newCoaster.html';
	a.className = 'bigBtn';
	a.textContent = 'Why not add it?';
}

/**
 * @param {number} id
 * @param {string} name
 * @param {string} park
 * @param {number} rows
 * @param {number} cols
 * @param {[number, number, number][][]} data
 * @param {number} total
 */
function populate(id, name, park, rows, cols, data, total) {
	const h = document.getElementById('pageHeader');
	if (h === null) { return; }
	h.textContent = name;
	document.body.appendChild(document.createElement('h2')).appendChild(document.createTextNode(park));

	const map = document.body.appendChild(document.createElement('section'));
	map.className = 'coaster';
	map.appendChild(document.createElement('p')).appendChild(document.createTextNode('Front of train'));
	const table = map.appendChild(document.createElement('table'));
	table.className = 'coasterTrain';

	const info = document.body.appendChild(document.createElement('section'));
	info.className = 'feedback';
	const infoHeader = info.appendChild(document.createElement('h2'));
	infoHeader.textContent = 'Select a seat to see ratings';
	const ratingTable = info.appendChild(document.createElement('table'));
	ratingTable.style.display = 'none';
	const ratings = ['Love', 'Like', 'Hate'].map((r) => {
		const tr = ratingTable.appendChild(document.createElement('tr'));
		tr.appendChild(document.createElement('th')).appendChild(document.createTextNode(r));
		const td = tr.appendChild(document.createElement('td'));
		const span = td.appendChild(document.createElement('span'));
		const txt = td.appendChild(document.createTextNode(''));
		return { span, txt };
	});
	const noOpinions = ratingTable.appendChild(document.createElement('tr')).appendChild(document.createElement('td'));
	noOpinions.colSpan = 2;
	noOpinions.textContent = '0 users had no opinion';
	const finalLink = info.appendChild(document.createElement('p')).appendChild(document.createElement('a'));
	finalLink.href = `/contribute?id=${id}`;
	finalLink.className = 'bigBtn';
	finalLink.textContent = 'Vote on your favorite seats';

	// Compute the colors
	const minmax = [0, 0];
	data.forEach((row, r) => {
		row.forEach((col, c) => {
			const v = data[r][c];
			const rr = v[0] * 3 + v[1] - v[2] * 3;
			if (rr < minmax[0]) {
				minmax[0] = rr;
			}
			if (rr > minmax[1]) {
				minmax[1] = rr;
			}
		});
	});

	/**
	 * @param {number} r
	 * @param {number} c
	 */
	const showRating = (r, c) => {
		ratingTable.style.display = 'block';
		const d = data[r][c];
		const voteTotal = d.reduce((a, x) => a + x);
		const left = total - voteTotal;
		noOpinions.textContent = `${left} ${left === 1 ? 'user' : 'users'} had no opinion`;
		const max = d.reduce((a, x) => (x > a ? x : a));

		if (ratings.length !== d.length) { return; }
		ratings.forEach((x, i) => {
			// eslint-disable-next-line no-param-reassign, no-mixed-operators
			x.span.style.width = `${d[i] / max * 100 / 2}%`;
			// eslint-disable-next-line no-param-reassign, no-mixed-operators
			x.txt.textContent = `${Math.round(d[i] / voteTotal * 100)}% (${d[i]})`;
		});

		infoHeader.textContent = `Row ${r + 1} — Seat ${c + 1}`;
	};

	for (let r = 0; r < rows; r++) {
		const tr = table.appendChild(document.createElement('tr'));
		tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(`${r + 1}`));
		for (let c = 0; c < cols; c++) {
			const td = tr.appendChild(document.createElement('td'));
			const btn = td.appendChild(document.createElement('button'));

			const d = data[r]?.[c];
			if (!d) {
				btn.style.background = 'gray';
			} else {
				const val = d[0] * 3 + d[1] - d[2] * 3;
				btn.style.background = val > 0 ? 'rgb(' : '';
				if (val >= 0) {
				// eslint-disable-next-line no-mixed-operators
					const g = val / minmax[1] * 128 + 128;
					const o = 256 - g;
					btn.style.background = `rgb(${o}, ${g}, ${o})`;
				} else {
				// eslint-disable-next-line no-mixed-operators
					const g = val / minmax[0] * 128;
					const o = 256 - g;
					btn.style.background = `rgb(${g}, ${o}, ${o})`;
				}
			}
			btn.addEventListener('click', () => showRating(r, c));
		}
	}
}
