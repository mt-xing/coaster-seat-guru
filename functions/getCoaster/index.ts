import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { CoasterDoc } from '../types/cosmos';
import { GetCoasterResponse } from '../types/getCoaster';

const httpTrigger: AzureFunction = function (
	context: Context, req: HttpRequest, inputDocument: CoasterDoc,
): void {
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
	};

	context.res = {
		body: JSON.stringify(resp),
	};
};

export default httpTrigger;
