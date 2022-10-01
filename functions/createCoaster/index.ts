import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { verifyToken } from '../model/auth';
import { CoasterDoc } from '../types/cosmos';
import { CreateCoasterPayload, isLegitTrain } from '../types/createCoaster';

const httpTrigger: AzureFunction = async function (
	context: Context, req: HttpRequest, inputDocument,
): Promise<void> {
	context.log('Adding a coaster');
	if (!req.body) {
		context.res = { status: 401 };
		return;
	}

	const body = req.body as CreateCoasterPayload;

	const { token, rcdb } = body;
	if (!token) {
		context.res = { status: 401 };
		return;
	}
	try {
		await verifyToken(token);
	} catch (e) {
		context.res = { status: 401 };
		return;
	}

	const rcdbMatch = /http(?:s?):\/\/rcdb.com\/([\d]+)\.htm/.exec(rcdb);
	if (rcdbMatch === null) {
		context.res = { status: 400 };
		return;
	}

	const id = rcdbMatch[1];
	if (id !== req.query.id) {
		context.res = { status: 400 };
		return;
	}
	if (inputDocument) {
		context.res = { status: 409 };
		return;
	}
	const {
		name, park, rows, cols,
	} = body;

	if (!name || !park || !rows || !cols) {
		context.res = { status: 400 };
		return;
	}

	const {
		spacings, carDesign, rowsPerCar,
	} = body;

	if (!spacings || !carDesign || !rowsPerCar) {
		context.res = { status: 400 };
		return;
	}

	if (!isLegitTrain(rows, cols, rowsPerCar, carDesign, spacings)) {
		context.res = { status: 400 };
		return;
	}

	context.bindings.outputDocument = JSON.stringify({
		id,
		name,
		searchName: `${name}${park}`.replace(/[\W_]+/g, '').toLowerCase(),
		park,
		rows,
		cols,
		data: Array.from(Array(rows).keys()).map(
			(_) => Array.from(Array(cols).keys()).map((_y) => [0, 0, 0]),
		),
		total: 0,
		spacings,
		carDesign,
		rowsPerCar,
	} as CoasterDoc);

	context.res = {
		status: 200,
	};
};

export default httpTrigger;
