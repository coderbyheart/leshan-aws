export const stackName = (type?: 'ecr' | 'middleware' | 'sourcecode'): string =>
	`${process.env.STACK_PREFIX ?? 'leshan'}${
		type !== undefined ? `-${type}` : ''
	}`
