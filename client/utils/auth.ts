type AuthStorage = {
	time: number,
	token: string,
};

export function storeAuth(token: string) {
	const storage: AuthStorage = {
		time: new Date().getTime() + 30 * 60 * 1000, // 30 min * 60 sec / min * 1000 ms / sec
		token,
	};
	window.sessionStorage.setItem('oauthToken', JSON.stringify(storage));
}

export function getAuth(): string | null {
	const currentToken = window.sessionStorage.getItem('oauthToken');
	if (currentToken === null) { return null; }
	const tokenInfo = JSON.parse(currentToken) as AuthStorage;
	if (tokenInfo.time > new Date().getTime()) {
		return tokenInfo.token;
	} else {
		return null;
	}
}
