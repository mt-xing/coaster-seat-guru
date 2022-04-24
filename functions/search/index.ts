import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { CoasterDoc } from '../types/cosmos';
import { SearchResponse } from '../types/search';

const httpTrigger: AzureFunction = function (
	context: Context, req: HttpRequest, inputDocument: CoasterDoc[],
): void {
	context.res = {
		body: inputDocument.map((x): SearchResponse => ({ id: x.id, name: x.name, park: x.park })),
	};
};

export default httpTrigger;
