import type { NextPage } from 'next';
import TrainEditor from '../../components/trainEditor';

const CoasterTrain: NextPage = () => (
	<main style={{ textAlign: 'center' }}>
		<h1>Train Editor</h1>
		<TrainEditor complete={console.log} initialRows={5} initialCols={3} />
	</main>
);

export default CoasterTrain;
