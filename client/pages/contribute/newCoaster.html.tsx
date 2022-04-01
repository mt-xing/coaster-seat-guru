import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import { PRODUCT_NAME } from '../../utils/consts';
import styles from '../../styles/NewCoaster.module.css';

function Redir() {
	useEffect(() => {
		window.location.replace('newCoaster');
	}, []);
	return null;
}

const RedirToNewCoaster: NextPage = () => (
	<>
		<Head>
			<title>Submit Coaster - {PRODUCT_NAME}</title>
			<meta name="description" content="Submit a new coaster" />
		</Head>
		<Redir />
		<div className={styles.load}><SyncLoader /></div>
	</>
);

export default RedirToNewCoaster;
