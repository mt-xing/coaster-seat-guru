// eslint-disable-next-line import/prefer-default-export
export function assertUnreachable(x: never): never {
	throw new Error(`Reached unreachable statement ${x}`);
}
