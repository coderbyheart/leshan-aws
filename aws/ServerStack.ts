import * as CloudFormation from '@aws-cdk/core'
import * as ECR from '@aws-cdk/aws-ecr'
import { LeshanFargate } from './LeshanFargate'

export class ServerStack extends CloudFormation.Stack {
	public constructor(
		parent: CloudFormation.App,
		id: string,
		args: {
			ecrRepositoryArn: string
		},
	) {
		super(parent, id)

		const leshan = new LeshanFargate(this, 'LeshanFargate', {
			...args,
			ecr: ECR.Repository.fromRepositoryArn(this, 'ecr', args.ecrRepositoryArn),
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
