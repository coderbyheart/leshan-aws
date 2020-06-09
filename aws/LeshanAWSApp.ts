import { App } from '@aws-cdk/core'
import { LeshanStack } from './LeshanStack'
import { stackName } from './stackName'
import { IoTMiddleWareStack } from './IoTMiddleWareStack'

export class LeshanAWSApp extends App {
	public constructor({ ecrRepositoryArn }: { ecrRepositoryArn: string }) {
		super()
		const mwStack = new IoTMiddleWareStack(this, stackName('middleware'))
		new LeshanStack(this, stackName(), {
			ecrRepositoryArn,
			queue: mwStack.lwm2mQueue,
		})
	}
}
