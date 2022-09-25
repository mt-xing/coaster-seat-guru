export type CarShape = 'normal' | 'circular';

export type CoasterDoc = {
	id: string,

	name: string,
	park: string,
	searchName: string,

	rows: number,
	cols: number,

	rowsPerCar?: number | number[],
	carDesign?: CarShape | CarShape[],
	spacings?: boolean[][],

	data: [number, number, number][][],
	total: number,
};
