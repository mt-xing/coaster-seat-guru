const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('576763212029-fsd49s3dgcnmrpm2rcgovfkvlkhp8ube.apps.googleusercontent.com');

async function verify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: '576763212029-fsd49s3dgcnmrpm2rcgovfkvlkhp8ube.apps.googleusercontent.com',
	});
	return true;
}

module.exports = async function (context, req, inputDocument) {
	context.log('Saving changes to coaster');

	if (!inputDocument) {
		context.res = {
			status: 404,
		};
		return;
	}

	context.bindings.outputDocument = JSON.stringify({

		id: inputDocument.id,
		name: inputDocument.name,
		park: inputDocument.park,
		rows: inputDocument.rows,
		cols: inputDocument.cols,
		data: inputDocument.data,
		total: inputDocument.total,

	});

	context.res = {
		status: 200,
	};
};
