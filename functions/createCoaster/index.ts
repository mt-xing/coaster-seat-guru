import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client('707815788715-v292qtutlmval10742tekpbnv2a6to6l.apps.googleusercontent.com');

async function verify(token: string) {
  await client.verifyIdToken({
    idToken: token,
    audience: '707815788715-v292qtutlmval10742tekpbnv2a6to6l.apps.googleusercontent.com',
  });
  return true;
}


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, inputDocument): Promise<void> {
    context.log('Adding a coaster');
    if (!req.body) {
      context.res = { status: 401 };
      return;
    }
  
    const { token } = req.body;
    if (!token) {
      context.res = { status: 401 };
      return;
    }
    try {
      await verify(token);
    } catch (e) {
      context.res = { status: 401 };
      return;
    }
  
    const rcdbMatch = /http(?:s?):\/\/rcdb.com\/([\d]+)\.htm/.exec(req.body.rcdb);
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
    const { name, park } = req.body;
    const rows = parseInt(req.body.rows, 10);
    const cols = parseInt(req.body.cols, 10);
  
    if (!name || !park || !rows || !cols) {
      context.res = { status: 400 };
      return;
    }
  
    context.bindings.outputDocument = JSON.stringify({
      id,
      name,
      searchName: name.replace(/[\W_]+/g, '').toLowerCase(),
      park,
      rows,
      cols,
      data: Array.from(Array(rows).keys()).map(
        (_) => Array.from(Array(cols).keys()).map((y) => [0, 0, 0]),
      ),
      total: 0,
    });
  
    context.res = {
      status: 200,
    };
};

export default httpTrigger;