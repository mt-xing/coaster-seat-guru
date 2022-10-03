import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getTokenSubject } from '../model/auth';
import { User, UserDoc } from '../model/user';
import { CoasterDoc } from '../types/cosmos';
import { VotePayload } from '../types/vote';

const httpTrigger: AzureFunction = async function (
	context: Context, req: HttpRequest, inputDocument: CoasterDoc, userDocument: UserDoc,
): Promise<void> {
	context.log('Saving changes to coaster');

	if (!inputDocument) {
		context.res = {
			status: 404,
		};
		return;
	}

	const body = req.body as VotePayload;
	const { token, votes } = body;
	if (!token || !votes) {
		context.res = { status: 401 };
		return;
	}
	const uid = await (async () => {
		try {
			return await getTokenSubject(token);
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
			}
		});
	});

	// TODO race conditions galore
	context.bindings.outputUserDocument = JSON.stringify(user.updateVotes(inputDocument.id, votes));
	context.bindings.outputDocument = JSON.stringify({
		id: inputDocument.id,
		name: inputDocument.name,
		searchName: inputDocument.searchName,
		park: inputDocument.park,
		rows: inputDocument.rows,
		cols: inputDocument.cols,
		data: inputDocument.data,
		total: inputDocument.total + (userPreviousVote !== null ? 0 : 1),

		rowsPerCar: inputDocument.rowsPerCar,
		spacings: inputDocument.spacings,
		carDesign: inputDocument.carDesign,
	});

	context.res = {
		status: 200,
	};
};

export default httpTrigger;
