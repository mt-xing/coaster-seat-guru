import styles from '../styles/Footer.module.css';

export default function Footer(props: {isDark: boolean}) {
	return (
		<footer className={props.isDark ? `${styles.footer} ${styles.dark}` : styles.footer}>
			<a href="https://www.flaticon.com/free-icons/roller-coaster" title="roller coaster icons">
				Roller coaster icons created by Freepik - Flaticon
			</a>
		</footer>
	);
}
