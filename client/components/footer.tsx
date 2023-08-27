import styles from '../styles/Footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div>
				<p>
				A website by <a href='https://michaelxing.com' target='_blank' rel='noreferrer'>Michael Xing</a>,
				with help from <a href='https://reddit.com/r/rollercoasters' target='_blank' rel='noreferrer'>r/rollercoasters</a>.
				</p>
			</div>
			<div>
				<p>
					{'Roller coaster icon by '}
					<a href="https://www.flaticon.com/free-icons/roller-coaster" target='_blank' rel='noreferrer'>
						Freepik - Flaticon
					</a>.
				</p>
				<p>Proudly open source on <a href='https://github.com/mt-xing/coaster-seat-guru' target='_blank' rel='noreferrer'>GitHub</a>.</p>
			</div>
		</footer>
	);
}
