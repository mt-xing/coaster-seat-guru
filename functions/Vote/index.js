const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('576763212029-fsd49s3dgcnmrpm2rcgovfkvlkhp8ube.apps.googleusercontent.com');

async function verify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: '576763212029-fsd49s3dgcnmrpm2rcgovfkvlkhp8ube.apps.googleusercontent.com',
	});
	return ticket.getPayload().sub;
}

/** @typedef {{id: string, submitted: Record<string, (number|null)[][]>}} UserDoc */

class User {
	/** @type {string} */
	#sub;

	/** @type {UserDoc | undefined} */
	#doc;

	/**
	 * @param {string} sub
	 * @param {UserDoc | undefined} doc
	 */
	constructor(sub, doc) {
		this.#sub = sub;
		this.#doc = doc;
	}

	/**
	 * @param {string} coasterId
	 * @returns {(number|null)[][] | null}
	 */
	getVotes(coasterId) {
		if (!this.#doc) {
			return null;
		}
		const c = this.#doc.submitted[coasterId];
		if (!c) {
			return null;
		}
		return c;
	}

	/**
	 * @param {string} coasterId
	 * @param {(number|null)[][]} votes
	 * @returns {UserDoc}
	 */
	updateVotes(coasterId, votes) {
		if (!this.#doc) {
			this.#doc = {
				id: this.#sub,
				submitted: {},
			};
		}
		this.#doc.submitted[coasterId] = votes;
		return this.#doc;
	}
}

module.exports = async function (context, req, inputDocument, userDocument) {
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
	const uid = await (async () => {
		try {
			return await verify(token);
		} catch (e) {
			return null;
		}
	})();
	if (uid === null) {
		context.res = { status: 401 };
		return;
	}
	const user = new User(uid, userDocument);

	const userPreviousVote = user.getVotes(inputDocument.id);
	if (userPreviousVote !== null) {
		if (userPreviousVote.length === inputDocument.rows) {
			userPreviousVote.forEach((voteRow, r) => {
				if (voteRow.length === inputDocument.cols) {
					voteRow.forEach((vote, c) => {
						switch (vote) {
						case 1:
							// eslint-disable-next-line no-param-reassign
							inputDocument.data[r][c][0]--;
							break;
						case 2:
							// eslint-disable-next-line no-param-reassign
							inputDocument.data[r][c][1]--;
							break;
						case 3:
							// eslint-disable-next-line no-param-reassign
							inputDocument.data[r][c][2]--;
							break;
						case null:
							break;
						default:
							break;
						}
					});
				}
			});
		}
	}

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

	// TODO race conditions galore
	context.bindings.outputUserDocument = JSON.stringify(user.updateVotes(inputDocument.id, votes));
	context.bindings.outputDocument = JSON.stringify({
		id: inputDocument.id,
		name: inputDocument.name,
		park: inputDocument.park,
		rows: inputDocument.rows,
		cols: inputDocument.cols,
		data: inputDocument.data,
		total: inputDocument.total + (userPreviousVote !== null ? 0 : 1),
	});

	context.res = {
		status: 200,
	};
};
