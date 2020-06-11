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
		iotEndpoint,
	}: {
		ecrRepositoryArn: string
		sourceCodeBucketName: string
		baseLayerZipFileName: string
		lambdas: LayeredLambdas<Lambdas>
		iotEndpoint: string
	}) {
		super()
		const mwStack = new IoTMiddleWareStack(this, stackName('middleware'), {
			sourceCodeBucketName,
			baseLayerZipFileName,
			lambdas,
			iotEndpoint,
		})
		new LeshanStack(this, stackName(), {
			ecrRepositoryArn,
			queue: mwStack.lwm2mQueue,
			iotEndpoint,
		})
	}
}
