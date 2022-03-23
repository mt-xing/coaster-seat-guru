const PRODUCT_NAME = 'Coaster Seat Guru';

class ProductName extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'closed' }).appendChild(document.createTextNode(PRODUCT_NAME));
	}
}
customElements.define('prod-name', ProductName);

class Search extends HTMLElement {
	/** @type {HTMLInputElement} */
	#input;

	/** @type {HTMLElement} */
	#resultsWrapper;

	/** @type {HTMLUListElement} */
	#results;

	/** @type {number | undefined} */
	#debounce;

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'closed' });

		const css = shadow.appendChild(document.createElement('link'));
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = '/search.css';

		this.#input = shadow.appendChild(document.createElement('input'));
		this.#input.type = 'text';
		this.#input.placeholder = 'Search for a coaster';
		this.#input.addEventListener('keyup', this.#changedSearch.bind(this));

		this.#resultsWrapper = shadow.appendChild(document.createElement('div'));
		this.#results = this.#resultsWrapper.appendChild(document.createElement('ul'));
		const source = this.#resultsWrapper.appendChild(document.createElement('p'));
		source.textContent = 'Don\'t see a coaster? ';
		const sourceLink = source.appendChild(document.createElement('a'));
		sourceLink.href = '/contribute/newCoaster.html';
		sourceLink.rel = 'noreferrer';
		sourceLink.textContent = 'Add it!';
	}

	#changedSearch() {
		if (this.#debounce !== undefined) {
			window.clearTimeout(this.#debounce);
		}
		this.#debounce = window.setTimeout(this.#querySearch.bind(this), 1000);
		this.#loadList();
	}

	#loadList() {
		if (this.#input.value === '') {
			this.#resultsWrapper.style.display = '';
			return;
		}

		this.#clearList();
		const l = this.#results.appendChild(document.createElement('p'));
		this.#resultsWrapper.style.display = 'block';
		l.textContent = 'Loading...';
		l.className = 'load';
	}

	#querySearch() {
		this.#debounce = undefined;

		const p = async () => {
			const val = this.#input.value.replace(/[\W_]+/g, '').toLowerCase();
			if (val === '') {
				this.#resultsWrapper.style.display = '';
				return;
			}
			const result = await fetch(`https://coasterseatguru.azurewebsites.net/api/Search?q=${val}`);
			if (!result.ok) {
				this.#resultsWrapper.style.display = '';
				return;
			}
			const r = await result.json();
			this.#populateList(r);
		};
		p();
	}

	/**
	 * @param {{name: string, park: string, id: string}[]} list
	 */
	#populateList(list) {
		this.#clearList();
		list.forEach((x) => this.#addChildToList(x.name, x.park, x.id));
		if (list.length === 0) {
			this.#resultsWrapper.style.display = '';

			const li = this.#results.appendChild(document.createElement('li'));
			const main = li.appendChild(document.createElement('p'));
			main.className = 'none';
			main.textContent = 'No results found :(';
		}
		this.#resultsWrapper.style.display = 'block';
	}

	#clearList() {
		while (this.#results.firstChild) {
			// @ts-ignore
			this.#results.removeChild(this.#results.lastChild);
		}
	}

	/**
	 * @param {string} name
	 * @param {string} sub
	 * @param {string} id
	 */
	#addChildToList(name, sub, id) {
		const li = this.#results.appendChild(document.createElement('li'));
		const a = li.appendChild(document.createElement('a'));
		a.href = `/results?id=${id}`;

		const main = a.appendChild(document.createElement('p'));
		main.textContent = name;

		const s = a.appendChild(document.createElement('p'));
		s.textContent = sub;
	}
}
customElements.define('csg-search', Search);

class Header extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: 'closed' });
		const css = shadow.appendChild(document.createElement('style'));
		css.textContent = `
header {
	width: 100%;
	box-shadow: 0 5px 5px black;
	text-align: left;
	display: flex;
	flex-direction: row;
	align-items: center;
}

img {
	height: 35px;
	margin-right: 10px;
}

h1 {
	margin: 15px 30px;
	font-size: 35px;
	display: inline-block;
}

div {
	display: inline-block;
	float: right;
	border: 1px black solid;
	margin-left: auto;
	margin-right: 20px;
}

a {
	text-decoration: none;
	color: black;
}
		`;

		const header = shadow.appendChild(document.createElement('header'));
		const a = header.appendChild(document.createElement('h1')).appendChild(document.createElement('a'));
		const img = a.appendChild(document.createElement('img'));
		img.src = '/img/icon.png';
		img.alt = '';
		a.appendChild(document.createTextNode(PRODUCT_NAME));
		a.href = '/';
		const searchWrap = header.appendChild(document.createElement('div'));
		searchWrap.appendChild(document.createElement('csg-search'));
	}
}
customElements.define('csg-header', Header);
