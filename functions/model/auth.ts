import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client('707815788715-v292qtutlmval10742tekpbnv2a6to6l.apps.googleusercontent.com');

export async function verifyToken(token: string) {
	await client.verifyIdToken({
		idToken: token,
		audience: '707815788715-v292qtutlmval10742tekpbnv2a6to6l.apps.googleusercontent.com',
	});
	return true;
}

export async function getTokenSubject(token: string) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: '707815788715-v292qtutlmval10742tekpbnv2a6to6l.apps.googleusercontent.com',
	});
	return ticket.getPayload().sub;
}
