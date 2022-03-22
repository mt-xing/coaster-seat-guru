const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('576763212029-fsd49s3dgcnmrpm2rcgovfkvlkhp8ube.apps.googleusercontent.com');

async function verify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: '576763212029-fsd49s3dgcnmrpm2rcgovfkvlkhp8ube.apps.googleusercontent.com',
	});
	return true;
}

module.exports = async function (context, req) {
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
