export type CoasterDoc = {
	id: number,

	name: string,
	park: string,
	searchName: string,

	rows: number,
	cols: number,

	data: [number, number, number][][],
	total: number,
};
