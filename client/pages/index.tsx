import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/footer';
import Search from '../components/search';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => (
	<div className={styles.container}>
		<Head>
			<title>Coaster Seat Guru</title>
			<meta name="description" content="See what seats on a roller coaster people prefer, and submit your own preferences. It's like that other trademarked site name, but for roller coasters." />
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
			<meta name="msapplication-TileColor" content="#da532c" />
			<meta name="theme-color" content="#ffffff" />

			<link rel="stylesheet" type="text/css" href="/home.css" />
		</Head>

		<h1 className={styles.title}>
        Coaster Seat Guru
		</h1>

		<p className={styles.searchWrap}>
			<Search />
		</p>

		<Footer />
	</div>
);

export default Home;
