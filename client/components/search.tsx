import { useCallback, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import styles from '../styles/Search.module.css';
import { assertUnreachable } from '../utils/assert';

type QueryResponse = {
	id: string, name: string, park: string
};

type ListStatus = {
	s: 'hidden',
} | {
	s: 'loading',
} | {
	s: 'displayed',
	list: QueryResponse[]
};

export default function Search() {
	const [query, setQuery] = useState('');
	const [debounce, setDebounce] = useState<number | null>(null);
	const [list, setList] = useState<ListStatus>({ s: 'hidden' });

	const executeQuery = useCallback(async (q) => {
		setDebounce(null);
		const val = q.replace(/[\W_]+/g, '').toLowerCase();
		if (val === '') {
			setList({ s: 'hidden' });
			return;
		}
		const result = await fetch(`https://coasterseatguru.azurewebsites.net/api/Search?q=${val}`);
		if (!result.ok) {
			setList({ s: 'hidden' });
			return;
		}
		const r = await result.json() as QueryResponse[];
		setList({ s: 'displayed', list: r });
	}, [setList, setDebounce]);

	const changeSearch = useCallback((e) => {
		const q = e.target.value;
		setQuery(q);
		if (debounce) {
			window.clearTimeout(debounce);
		}
		const val = q.replace(/[\W_]+/g, '').toLowerCase();
		if (val === '') {
			setList({ s: 'hidden' });
			return;
		}
		setList({ s: 'loading' });
		setDebounce(window.setTimeout(() => executeQuery(q), 1000));
	}, [setQuery, debounce, setDebounce, executeQuery]);

	const renderList = useCallback(() => {
		const addPrompt = <span className={styles.prompt}>
			Don&apos;t see a coaster? <a href="/contribute/newCoaster">Add it!</a>
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
								<a href={`/results?id=${item.id}`}>
									<p>{item.name}</p>
									<p>{item.park}</p>
								</a>
							</li>
						))}
					</ul>
					{addPrompt}
				</div>;
		default:
			return assertUnreachable(list);
		}
	}, [list]);

	return <>
		<input type='text' placeholder='Search for a coaster' value={query} onChange={changeSearch} className={styles.input} />
		{renderList()}
	</>;
}
