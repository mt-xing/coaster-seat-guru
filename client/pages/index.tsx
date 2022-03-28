import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/footer';
import Search from '../components/search';
import { PRODUCT_NAME } from '../utils/consts';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => (
	<div className={styles.imageContainer}>
		<div className={styles.container}>
			<Head>
				<title>{PRODUCT_NAME}</title>
				<meta name="description" content="See what seats on a roller coaster people prefer, and submit your own preferences. It's like that other trademarked site name, but for roller coasters." />
			</Head>

			<h1 className={styles.title}>
			Seat Guru
			</h1>

			<p className={styles.searchWrap}>
				<Search />
			</p>

			<Footer />
		</div>
	</div>
);

export default Home;
