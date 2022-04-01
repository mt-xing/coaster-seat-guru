/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { PRODUCT_NAME } from '../utils/consts';
import Search from './search';

import styles from '../styles/Header.module.css';

export default function Header() {
	return (
		<header className={styles.header}>
			<h1 className={styles.h1}>
				<Link href='/'>
					<a className={styles.a}>
						<img src='/img/icon.png' alt='' className={styles.img} />
						{PRODUCT_NAME}
					</a>
				</Link>
			</h1>
			<div className={styles.div}>
				<Search />
			</div>
		</header>
	);
}
