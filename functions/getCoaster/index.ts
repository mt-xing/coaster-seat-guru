import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { CoasterDoc } from '../types/cosmos';
import { GetCoasterResponse } from '../types/getCoaster';

const httpTrigger: AzureFunction = async function (
	context: Context, req: HttpRequest, inputDocument: CoasterDoc,
): Promise<void> {
	context.log('Fetching coaster');

	if (!inputDocument) {
		context.res = {
			status: 404,
		};
		return;
	}

	const resp: GetCoasterResponse = {
		id: inputDocument.id,
		name: inputDocument.name,
		park: inputDocument.park,
		rows: inputDocument.rows,
		cols: inputDocument.cols,
		data: inputDocument.data,
		total: inputDocument.total,

		rowsPerCar: inputDocument.rowsPerCar,
		spacings: inputDocument.spacings,
		carDesign: inputDocument.carDesign,
	};

	context.res = {
		body: JSON.stringify(resp),
	};
};

export default httpTrigger;
