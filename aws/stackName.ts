export const stackName = (type?: 'ecr' | 'middleware') =>
	`${process.env.STACK_PREFIX || 'leshan'}${type ? `-${type}` : ''}`
