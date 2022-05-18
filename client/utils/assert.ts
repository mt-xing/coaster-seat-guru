// eslint-disable-next-line import/prefer-default-export
export function assertUnreachable(x: never): never {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	throw new Error(`Reached unreachable statement ${x}`);
}
