import styles from '../styles/AuthBlocker.module.css';

export default function AuthBlocker() {
	return <div className={styles.wrap}>
		<h1>Sign In</h1>
		<div id='gbuttonDiv'></div>
		<p>
			This is my attempt to stop the same person from spamming
			multiple reviews on the same ride.
			I don&apos;t track anything from your Google account.
			If you have a better idea for how to do this, suggestions are welcome.
		</p>
	</div>;
}
