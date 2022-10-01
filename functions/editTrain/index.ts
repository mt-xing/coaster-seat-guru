import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getTokenSubject } from '../model/auth';
import { CoasterDoc } from '../types/cosmos';
import { isLegitTrain } from '../types/createCoaster';
import { EditTrainPayload } from '../types/editTrain';

const httpTrigger: AzureFunction = async function (
	context: Context, req: HttpRequest, inputDocument: CoasterDoc,
): Promise<void> {
	context.log('Saving changes to train');

	if (!inputDocument) {
		context.res = {
			status: 404,
		};
		return;
	}

	const body = req.body as EditTrainPayload;
	const {
		token, id, rowsPerCar, carDesign, spacings,
	} = body;
	if (!token || !id || !rowsPerCar || !carDesign || !spacings) {
		context.res = { status: 401 };
		return;
	}

	if (inputDocument.carDesign && inputDocument.rowsPerCar && inputDocument.spacings) {
		const {
			rows, cols, rowsPerCar: rowsPerCar2, carDesign: carDesign2, spacings: spacings2,
		} = inputDocument;
		if (isLegitTrain(rows, cols, rowsPerCar2, carDesign2, spacings2)) {
			context.res = { status: 400 };
			return;
		}
	}

	if (!isLegitTrain(inputDocument.rows, inputDocument.cols, rowsPerCar, carDesign, spacings)) {
		context.res = { status: 400 };
		return;
	}

	const uid = await (async () => {
		try {
			return await getTokenSubject(token);
		} catch (e) {
			return null;
		}
	})();
	if (uid === null) {
		context.res = { status: 401 };
		return;
	}

	context.bindings.outputDocument = JSON.stringify({
		id: inputDocument.id,
		name: inputDocument.name,
		searchName: inputDocument.searchName,
		park: inputDocument.park,
		rows: inputDocument.rows,
		cols: inputDocument.cols,
		data: inputDocument.data,
		total: inputDocument.total,

		rowsPerCar,
		spacings,
		carDesign,
	} as CoasterDoc);

	context.res = {
		status: 200,
	};
};

export default httpTrigger;
