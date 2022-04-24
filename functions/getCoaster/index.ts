import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = function (
  context: Context, req: HttpRequest, inputDocument,
): void {
  context.log('Fetching coaster');

  if (!inputDocument) {
    context.res = {
      status: 404,
    };
    return;
  }

  const resp = {
    id: inputDocument.id,
    name: inputDocument.name,
    park: inputDocument.park,
    rows: inputDocument.rows,
    cols: inputDocument.cols,
    data: inputDocument.data,
    total: inputDocument.total,
  };

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: JSON.stringify(resp),
  };
};

export default httpTrigger;
