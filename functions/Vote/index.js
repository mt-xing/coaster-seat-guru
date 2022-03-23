const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('576763212029-fsd49s3dgcnmrpm2rcgovfkvlkhp8ube.apps.googleusercontent.com');

async function verify(token) {
	await client.verifyIdToken({
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

	const { token, votes } = req.body;
	if (!token || !votes) {
		context.res = { status: 401 };
		return;
	}
	try {
		await verify(token);
	} catch (e) {
		context.res = { status: 401 };
		return;
	}

	// TODO remove user's old votes if present
	if (votes.length !== inputDocument.rows) {
		context.res = { status: 401 };
		return;
	}
	votes.forEach((voteRow, r) => {
		if (voteRow.length !== inputDocument.cols) {
			context.res = { status: 401 };
			return;
		}
		voteRow.forEach((vote, c) => {
			// vote === 1, 2, or 3, or undefined
			switch (vote) {
			case 1:
				// eslint-disable-next-line no-param-reassign
				inputDocument.data[r][c][0]++;
				break;
			case 2:
				// eslint-disable-next-line no-param-reassign
				inputDocument.data[r][c][1]++;
				break;
			case 3:
				// eslint-disable-next-line no-param-reassign
				inputDocument.data[r][c][2]++;
				break;
			case null:
				break;
			default:
				context.res = { status: 400 };
				return;
			}
		});
	});

	context.bindings.outputDocument = JSON.stringify({

		id: inputDocument.id,
		name: inputDocument.name,
		park: inputDocument.park,
		rows: inputDocument.rows,
		cols: inputDocument.cols,
		data: inputDocument.data,
		total: inputDocument.total + 1,

	});

	context.res = {
		status: 200,
	};
};
