export type CarShape = 'normal' | 'circular';

export type StandardTrainState = {
	type: 'standard',
	rowsPerCar: number,
	carDesign: CarShape,
	spacings: boolean[][],
};

export type CustomTrainState = CustomTrainStateEvenRows | CustomTrainStateAdvRows;

export type CustomTrainStateEvenRows = {
	type: 'customEvenRows',
	rowsPerCar: number,
	carDesign: CarShape[],
	spacings: boolean[][],
}

export 	type CustomTrainStateAdvRows = {
	type: 'custom',
	// Each entry is zero-index number of row after which to cut the car,
	// INCLUDING last car; length === number of cars
	rowsPerCar: number[],
	carDesign: CarShape[],
	spacings: boolean[][],
}

export type TrainEditorState = StandardTrainState | CustomTrainState;

const printError = (state: unknown) => {
	// eslint-disable-next-line no-console
	console.error('Invalid state');
	// eslint-disable-next-line no-console
	console.error(state);

	if (process.env.NODE_ENV === 'development') {
		throw new Error('Invalid state');
	}
};

export function allCarsSameLength(state: TrainEditorState) {
	if (state.type === 'standard' || state.type === 'customEvenRows') {
		return true;
	}

	const { rowsPerCar } = state;

	if (rowsPerCar.length !== 0) {
		const carLength = rowsPerCar[0] + 1;
		if (rowsPerCar.some((x, i, a) => i !== 0 && (x - a[i - 1]) !== carLength)) {
			return false;
		}
	} else {
		printError(state);
	}

	return true;
}

export function allCarsSame(state: TrainEditorState, rows: number) {
	if (state.type === 'standard') {
		return true;
	}

	if (!allCarsSameLength(state)) {
		return false;
	}

	// All cars same length

	if (state.carDesign.length !== 0) {
		if (state.carDesign.some((x) => x !== state.carDesign[0])) {
			return false;
		}
	} else {
		printError(state);
	}

	// All cars same length and type
	if (state.spacings.length === rows) {
		const carLength = typeof state.rowsPerCar === 'number' ? state.rowsPerCar : state.rowsPerCar[0] + 1;
		const numCars = rows / carLength;
		if (Math.floor(numCars) !== numCars || carLength > state.spacings.length) {
			printError(state);
			return false;
		}
		for (let carI = 0; carI < carLength; carI++) {
			// carI = row within a car
			const baseline = state.spacings[carI];
			for (let j = 0; j < numCars; j++) {
				if (state.spacings[j * carLength + carI].some((x, i) => x !== baseline[i])) {
					return false;
				}
			}
		}
	} else {
		printError(state);
	}

	return true;
}

export function convertSameToCustomFull(state: StandardTrainState, rows: number):
CustomTrainStateAdvRows {
	const numCars = rows / state.rowsPerCar;
	if (Math.floor(numCars) !== numCars) {
		printError(state);
	}

	const newSpacings: boolean[][] = [];
	for (let i = 0; i < numCars; i++) {
		state.spacings.forEach((row) => newSpacings.push(row.slice()));
	}
	if (newSpacings.length !== rows) {
		printError(state);
	}

	const rowsPerCar = Array.from(Array(rows).keys()).filter((i) => (i + 1) % state.rowsPerCar === 0);

	return {
		type: 'custom',
		rowsPerCar,
		carDesign: rowsPerCar.map((_) => state.carDesign),
		spacings: newSpacings,
	};
}

export function convertSameToCustomKeepCar(state: StandardTrainState, rows: number):
CustomTrainStateEvenRows {
	const temp = convertSameToCustomFull(state, rows);
	return {
		...temp,
		type: 'customEvenRows',
		rowsPerCar: temp.rowsPerCar.length > 0 ? temp.rowsPerCar[0] + 1 : 0,
	};
}
