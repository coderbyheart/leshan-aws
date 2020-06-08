import { App } from '@aws-cdk/core'
import { ServerStack } from './ServerStack'

export class ServerApp extends App {
	public constructor(
		stackId: string,
		args: {
			ecrRepositoryArn: string
		},
	) {
		super()
		new ServerStack(this, stackId, args)
	}
}
