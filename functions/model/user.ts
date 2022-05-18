export type UserDoc = {
	id: string, submitted: Record<number, (number|null)[][]>
};

export class User {
	#sub: string;

	#doc: UserDoc | undefined;

	constructor(sub: string, doc: UserDoc | undefined) {
		this.#sub = sub;
		this.#doc = doc;
	}

	getVotes(coasterId: number): (number|null)[][] | null {
		if (!this.#doc) {
			return null;
		}
		const c = this.#doc.submitted[coasterId];
		if (!c) {
			return null;
		}
		return c;
	}

	updateVotes(coasterId: number, votes: (number|null)[][]): UserDoc {
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
