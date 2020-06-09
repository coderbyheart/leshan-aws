import * as CloudFormation from '@aws-cdk/core'
import * as ECR from '@aws-cdk/aws-ecr'
import { LeshanFargate } from './LeshanFargate'
import * as SQS from '@aws-cdk/aws-sqs'
import * as IAM from '@aws-cdk/aws-iam'

export class LeshanStack extends CloudFormation.Stack {
	public constructor(
		parent: CloudFormation.App,
		id: string,
		{
			ecrRepositoryArn,
			queue,
		}: {
			ecrRepositoryArn: string
			queue: SQS.IQueue
		},
	) {
		super(parent, id)

		const user = new IAM.User(this, 'user')

		user.addToPolicy(
			new IAM.PolicyStatement({
				actions: ['sqs:SendMessage', 'sqs:SendMessageBatch'],
				resources: [queue.queueArn],
			}),
		)

		const accessKey = new IAM.CfnAccessKey(this, 'userAccessKey', {
			userName: user.userName,
			status: 'Active',
		})

		const leshan = new LeshanFargate(this, 'LeshanFargate', {
			ecr: ECR.Repository.fromRepositoryArn(this, 'ecr', ecrRepositoryArn),
			userAccessKey: accessKey,
			queue: queue,
		})

		new CloudFormation.CfnOutput(this, 'fargateServiceArn', {
			value: leshan.fargateService.serviceArn,
			exportName: `${this.stackName}:fargateServiceArn`,
		})

		new CloudFormation.CfnOutput(this, 'clusterArn', {
			value: leshan.cluster.clusterArn,
			exportName: `${this.stackName}:clusterArn`,
		})
	}
}
