import { CarShape } from './cosmos';

export type CreateCoasterPayload = {
	token: string,
	rcdb: string,
	name: string,
	park: string,
	rows: number,
	cols: number,
	rowsPerCar: number | number[],
	carDesign: CarShape | CarShape[],
	spacings: boolean[][],
};

export function isLegitTrain(
	rows: number,
	cols: number,
	rowsPerCar: number | number[],
	carDesign: CarShape | CarShape[],
	spacings: boolean[][],
): boolean {
	if (rows <= 0 || cols <= 0) { return false; }

	if (Array.isArray(rowsPerCar)) {
		// Custom Train
		if (!Array.isArray(carDesign)) { return false; }
		if (spacings.length !== rows) { return false; }
	} else if (Array.isArray(carDesign)) {
		// Custom Even Rows
		if (spacings.length !== rows) { return false; }
		if (rows % rowsPerCar !== 0) { return false; }
	} else {
		// Standard Train
		// eslint-disable-next-line no-lonely-if
		if (rows % rowsPerCar !== 0) { return false; }
	}

	if (spacings.some(
		(row) => row.reduce((a, x) => (x ? a + 1 : a), 0) !== cols,
	)) {
		return false;
	}
	return true;
}
