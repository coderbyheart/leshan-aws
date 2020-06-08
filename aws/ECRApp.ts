import { App } from '@aws-cdk/core'
import { ECRStack } from './ECRStack'

export class ECRApp extends App {
	public constructor({ stackId }: { stackId: string }) {
		super()
		new ECRStack(this, stackId)
	}
}
