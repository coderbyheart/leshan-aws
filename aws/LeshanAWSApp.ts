import { App } from '@aws-cdk/core'
import { LeshanStack } from './LeshanStack'
import { stackName } from './stackName'
import { IoTMiddleWareStack } from './IoTMiddleWareStack'
import { LayeredLambdas } from '@bifravst/package-layered-lambdas'
import { Lambdas } from './prepare-resources'

export class LeshanAWSApp extends App {
	public constructor({
		ecrRepositoryArn,
		sourceCodeBucketName,
		baseLayerZipFileName,
		lambdas,
	}: {
		ecrRepositoryArn: string
		sourceCodeBucketName: string
		baseLayerZipFileName: string
		lambdas: LayeredLambdas<Lambdas>
	}) {
		super()
		const mwStack = new IoTMiddleWareStack(this, stackName('middleware'), {
			sourceCodeBucketName,
			baseLayerZipFileName,
			lambdas,
		})
		new LeshanStack(this, stackName(), {
			ecrRepositoryArn,
			queue: mwStack.lwm2mQueue,
		})
	}
}
