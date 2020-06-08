export const stackName = (type?: 'ecr') =>
	`${process.env.STACK_NAME || 'leshan'}${type ? `-${type}` : ''}`
