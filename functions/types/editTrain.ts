import { CarShape } from './cosmos';

export type EditTrainPayload = {
	token: string,
	id: string,
	rowsPerCar: number | number[],
	carDesign: CarShape | CarShape[],
	spacings: boolean[][],
};
