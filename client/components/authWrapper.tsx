/* eslint-disable no-console */
import Script from 'next/script';
import React, {
	ReactNode, useCallback, useEffect, useState
} from 'react';
import { SyncLoader } from 'react-spinners';
import styles from '../styles/AuthWrapper.module.css';

export default function AuthWrapper(props: {page: ReactNode}) {
	const [loaded, setLoaded] = useState(false);
	const doneLoading = useCallback(() => setLoaded(true), []);
	useEffect(() => {
		if ('google' in window) {
			doneLoading();
		}
	}, [doneLoading]);

	return <>
		<Script src='https://accounts.google.com/gsi/client' onLoad={doneLoading} onError={console.error} />
		{loaded ? props.page : <div className={styles.load}><SyncLoader /></div>}
	</>;
}
