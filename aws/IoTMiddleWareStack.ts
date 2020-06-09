import * as CloudFormation from '@aws-cdk/core'
import * as SQS from '@aws-cdk/aws-sqs'

export class IoTMiddleWareStack extends CloudFormation.Stack {
	public readonly lwm2mQueue: SQS.IQueue

	public constructor(parent: CloudFormation.App, id: string) {
		super(parent, id)

		this.lwm2mQueue = new SQS.Queue(this, 'lwm2mQueue', {
			fifo: true,
			queueName: `${`${id}-${this.stackName}`.substr(0, 75)}.fifo`,
		})
	}
}
