import Link from 'next/link';
import {
	ChangeEvent, useCallback, useMemo, useState
} from 'react';
import { SyncLoader } from 'react-spinners';
import styles from '../styles/Search.module.css';
import { assertUnreachable } from '../utils/assert';
import { API_ENDPOINT } from '../utils/consts';

const getDebounceTime = (val: string) => {
	const DEBOUNCE_TIME = 500;
	switch (val.length) {
	case 0:
		return Number.POSITIVE_INFINITY;
	case 1:
		return DEBOUNCE_TIME * 4;
	case 2:
		return DEBOUNCE_TIME;
	case 3:
		return DEBOUNCE_TIME / 2;
	case 4:
		return DEBOUNCE_TIME / 5;
	default:
		return DEBOUNCE_TIME / 10;
	}
};

type QueryResponse = {
	id: string, name: string, park: string
};

type Props = {
	customStyles?: string,
	customWrap?: string,
}

type ListStatus = {
	s: 'hidden',
} | {
	s: 'loading',
} | {
	s: 'displayed',
	list: QueryResponse[]
};

const [fetchUniqueQuery, invalidateQueries] = (() => {
	let nonce = 0;
	return [async (
		setList: (l: ListStatus) => void,
		setDebounce: (d: number | null) => void,
		q: string,
	) => {
		setDebounce(null);
		const val = q.replace(/[\W_]+/g, '').toLowerCase();
		if (val === '') {
			setList({ s: 'hidden' });
			return;
		}
		nonce++;
		const cn = nonce;
		const result = await fetch(`${API_ENDPOINT}Search?q=${val}`);
		if (!result.ok) {
			setList({ s: 'hidden' });
			return;
		}
		const r = await result.json() as QueryResponse[];
		if (nonce !== cn) {
			// Another query got in first; abandon
			return;
		}
		setList({ s: 'displayed', list: r });
	}, () => { nonce++; }];
})();

export default function Search(props: Props) {
	const [query, setQuery] = useState('');
	const [debounce, setDebounce] = useState<number | null>(null);
	const [list, setList] = useState<ListStatus>({ s: 'hidden' });

	const executeQuery = useMemo(() => fetchUniqueQuery.bind(
		{},
		setList,
		setDebounce
	), [setList, setDebounce]);

	const clearQuery = useCallback(() => {
		invalidateQueries();
		setQuery('');
		setList({ s: 'hidden' });
	}, []);

	const changeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const q = e.target.value;
		setQuery(q);
		if (debounce) {
			window.clearTimeout(debounce);
		}
		const val = q.replace(/[\W_]+/g, '').toLowerCase();
		if (val === '') {
			invalidateQueries();
			setList({ s: 'hidden' });
			return;
		}
		setList({ s: 'loading' });
		setDebounce(window.setTimeout(() => void executeQuery(q), getDebounceTime(val)));
	}, [setQuery, debounce, setDebounce, executeQuery]);

	const renderList = useCallback(() => {
		const addPrompt = <span className={styles.prompt}>
			Don&apos;t see a coaster? <Link href="/contribute/newCoaster"><a>Add it!</a></Link>
		</span>;
		switch (list.s) {
		case 'hidden':
			return null;
		case 'loading':
			return <div className={styles.results}><span className={styles.load}><SyncLoader color='white' size={5} /></span></div>;
		case 'displayed':
			return list.list.length === 0
				? <div className={styles.results}>
					<span className={styles.noResults}>No results found</span>{' '}{addPrompt}
				</div>
				: <div className={styles.results}>
					<ul>
						{list.list.map((item) => (
							<li key={item.id}>
								<Link href={`/results?id=${item.id}`}>
									<a onClick={clearQuery}>
										<p>{item.name}</p>
										<p>{item.park}</p>
									</a>
								</Link>
							</li>
						))}
					</ul>
					{addPrompt}
				</div>;
		default:
			return assertUnreachable(list);
		}
	}, [list, clearQuery]);

	return <div className={props.customWrap ? `${styles.wrap} ${props.customWrap}` : styles.wrap}>
		<input type='text' placeholder='Search for a coaster' value={query} onChange={changeSearch} className={props.customStyles ?? styles.input} />
		{renderList()}
	</div>;
}
