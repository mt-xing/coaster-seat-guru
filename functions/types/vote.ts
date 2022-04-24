export type VotePayload = {
	token: string,
	votes: (1 | 2 | 3 | null)[][]
};
