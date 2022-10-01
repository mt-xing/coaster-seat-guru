import { CarShape } from './cosmos';

export type GetCoasterResponse = {
	id: string,
	name: string,
	park: string,
	rows: number,
	cols: number,
	data: [number, number, number][][],
	total: number,

	rowsPerCar?: number | number[],
	carDesign?: CarShape | CarShape[],
	spacings?: boolean[][],
};
