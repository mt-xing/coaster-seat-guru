import TrainEditor from 'components/trainEditor';
import type { NextPage } from 'next';

const Test: NextPage = () => (
	<main style={{ textAlign: 'center' }}>
		<h1>Train Editor</h1>
		<TrainEditor rows={8} cols={2} />
	</main>
);

export default Test;
