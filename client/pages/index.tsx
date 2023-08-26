import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Search from 'components/search';
import { PRODUCT_NAME } from '../utils/consts';
import styles from '../styles/Home.module.css';

const coasters = [{
	name: 'Fury 325',
	id: 12273,
}, {
	name: 'Magnum XL-200',
	id: 11,
}, {
	name: 'Steel Vengeance',
	id: 15411,
}, {
	name: 'X2',
	id: 750,
}, {
	name: 'Iron Gwazi',
	id: 16985,
}, {
	name: 'Twisted Timbers',
	id: 15028,
}, {
	name: 'Mystic Timbers',
	id: 14116,
}, {
	name: 'GhostRider',
	id: 526,
}];

const Test: NextPage = () => {
	const [c, setC] = useState<typeof coasters>([]);
	useEffect(() => {
		setC(Array.from(Array(coasters.length))
			.map((_, i) => i).sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, 3)
			.map((x) => coasters[x]));
	}, []);
	return (
		<div className={styles.homeWrap}>
			<div className={styles.topWrap}>
				<Head>
					<title>{PRODUCT_NAME}</title>
					<meta name="description" content="See what seats on a roller coaster people prefer, and submit your own preferences. It's like that other trademarked site name, but for roller coasters." />
				</Head>

				<div className={styles.topContent}>
					<h1 className={styles.title}>
						{PRODUCT_NAME}
					</h1>

					<Search customStyles={styles.search} />
				</div>

				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="/img/fury.jpg" alt="" className={styles.bgImg} />
			</div>

			<p className={styles.topText}>
			Find the best seats on any roller coaster, according to the wisdom of the internet.
			After all, when have they ever been wrong? It&apos;s like that other trademarked website,
			but for roller coasters.
			</p>
			<p>
			Not sure where to start? Here&apos;s a few roller coasters selected using a highly
			sophisticated AI algorithm called me randomly picking some I like.
			</p>

			<ul className={styles.coasterList}>
				{c.map((x) => (
					<li key={x.name}><span>
						<Link href={`/results/?id=${x.id}`} passHref>{x.name}</Link></span>
					</li>
				))}
			</ul>

			<div className={styles.footerWrap}>
				<p>
				A website by <a href='https://michaelxing.com' target='_blank' rel='noreferrer'>Michael Xing</a>,
				with help from <a href='https://reddit.com/r/rollercoasters' target='_blank' rel='noreferrer'>r/rollercoasters</a>.
				</p>
				<p>
					{'Roller coaster icon by '}
					<a href="https://www.flaticon.com/free-icons/roller-coaster" target='_blank' rel='noreferrer'>
						Freepik - Flaticon
					</a>.
					<br />
				Proudly open source on <a href='https://github.com/mt-xing/coaster-seat-guru' target='_blank' rel='noreferrer'>GitHub</a>.
				</p>
			</div>

		</div>
	);
};

export default Test;
