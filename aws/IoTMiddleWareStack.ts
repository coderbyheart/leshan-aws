import * as CloudFormation from '@aws-cdk/core'
import * as SQS from '@aws-cdk/aws-sqs'
import * as Lambda from '@aws-cdk/aws-lambda'
import * as IAM from '@aws-cdk/aws-iam'
import * as S3 from '@aws-cdk/aws-s3'
import { LayeredLambdas } from '@bifravst/package-layered-lambdas'
import { Lambdas } from './prepare-resources'
import * as CloudWatchLogs from '@aws-cdk/aws-logs'

export class IoTMiddleWareStack extends CloudFormation.Stack {
	public readonly lwm2mQueue: SQS.IQueue

	public constructor(
		parent: CloudFormation.App,
		id: string,
		{
			sourceCodeBucketName,
			baseLayerZipFileName,
			lambdas,
			iotEndpoint,
		}: {
			sourceCodeBucketName: string
			baseLayerZipFileName: string
			lambdas: LayeredLambdas<Lambdas>
			iotEndpoint: string
		},
	) {
		super(parent, id)

		const sourceCodeBucket = S3.Bucket.fromBucketName(
			this,
			'sourceCodeBucket',
			sourceCodeBucketName,
		)

		const baseLayer = new Lambda.LayerVersion(this, `${id}-layer`, {
			code: Lambda.Code.bucket(sourceCodeBucket, baseLayerZipFileName),
			compatibleRuntimes: [Lambda.Runtime.NODEJS_12_X],
		})

		this.lwm2mQueue = new SQS.Queue(this, 'lwm2mQueue', {
			fifo: true,
			queueName: `${`${id}-${this.stackName}`.substr(0, 75)}.fifo`,
			visibilityTimeout: CloudFormation.Duration.minutes(5),
		})

		const processQueueLambda = new Lambda.Function(this, 'processQueue', {
			handler: 'index.handler',
			runtime: Lambda.Runtime.NODEJS_12_X,
			timeout: CloudFormation.Duration.minutes(5),
			memorySize: 1792,
			code: Lambda.Code.bucket(
				sourceCodeBucket,
				lambdas.lambdaZipFileNames.processQueue,
			),
			layers: [baseLayer],
			description: 'Process messages from LwM2M devices in the queue',
			initialPolicy: [
				new IAM.PolicyStatement({
					resources: ['*'],
					actions: [
						'logs:CreateLogGroup',
						'logs:CreateLogStream',
						'logs:PutLogEvents',
					],
				}),
				new IAM.PolicyStatement({
					actions: [
						'sqs:ReceiveMessage',
						'sqs:DeleteMessage',
						'sqs:GetQueueAttributes',
					],
					resources: [this.lwm2mQueue.queueArn],
				}),
				new IAM.PolicyStatement({
					actions: ['iot:*'],
					resources: ['*'],
				}),
			],
			environment: {
				IOT_ENDPOINT: iotEndpoint,
			},
		})

		new CloudWatchLogs.LogGroup(this, `processQueueLogGroup`, {
			removalPolicy: CloudFormation.RemovalPolicy.DESTROY,
			logGroupName: `/aws/lambda/${processQueueLambda.functionName}`,
			retention: CloudWatchLogs.RetentionDays.ONE_WEEK,
		})

		processQueueLambda.addPermission('invokeBySQS', {
			principal: new IAM.ServicePrincipal('sqs.amazonaws.com'),
			sourceArn: this.lwm2mQueue.queueArn,
		})

		new Lambda.EventSourceMapping(this, 'invokeProcessQueueLambdaFromQueue', {
			eventSourceArn: this.lwm2mQueue.queueArn,
			target: processQueueLambda,
			batchSize: 10,
		})
	}
}
