import Image from 'next/image';
import Link from 'next/link';
import PRODUCT_IMAGE from '../public/img/icon.png';
import { PRODUCT_NAME } from '../utils/consts';
import Search from './search';

import styles from '../styles/Header.module.css';

export default function Header() {
	return (
		<header className={styles.header}>
			<h1 className={styles.h1}>
				<Link href='/'>
					<a className={styles.a}>
						<span className={styles.img}><Image src={PRODUCT_IMAGE} alt='' height={35} width={35} /></span>
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
