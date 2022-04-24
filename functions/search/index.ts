import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, inputDocument): Promise<void> {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: inputDocument.map((x) => ({ id: x.id, name: x.name, park: x.park })),
    };
};

export default httpTrigger;