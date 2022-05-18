export type GetCoasterResponse = {
	id: number,
	name: string,
	park: string,
	rows: number,
	cols: number,
	data: [number, number, number][][],
	total: number,
};
