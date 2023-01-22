import Head from 'next/head';
import Footer from '../components/footer';
import Header from '../components/header';
import { PRODUCT_NAME } from '../utils/consts';
import styles from '../styles/Results.module.css';

export default function Custom404() {
	return <>
		<Head>
			<title>404 - {PRODUCT_NAME}</title>
			<meta name="description" content="Coaster seat map" />
		</Head>
		<Header />
		<main className={styles.main}>
			<h1 style={{ fontSize: '1000%', margin: 0 }}>404</h1>
			<h2 style={{ fontSize: '300%' }}>Page Not Found</h2>
			<p>Like Six Flags&apos; corporate strategy, this page doesn&apos;t seem to exist.</p>
			<p>Why not try searching for a coaster?</p>
		</main>
		<Footer isDark={false} />
	</>;
}
