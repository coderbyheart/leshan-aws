import * as CloudFormation from '@aws-cdk/core'
import * as ECR from '@aws-cdk/aws-ecr'

export enum Outputs {
	repositoryArn = 'repositoryArn',
}

export class ECRStack extends CloudFormation.Stack {
	public constructor(parent: CloudFormation.App, id: string) {
		super(parent, id)

		const ecr = new ECR.Repository(this, 'Repository')

		new CloudFormation.CfnOutput(this, 'repositoryName', {
			value: ecr.repositoryName,
			exportName: `${this.stackName}:repositoryName`,
		})

		new CloudFormation.CfnOutput(this, Outputs.repositoryArn, {
			value: ecr.repositoryArn,
			exportName: `${this.stackName}:${Outputs.repositoryArn}`,
		})

		new CloudFormation.CfnOutput(this, 'repositoryUri', {
			value: ecr.repositoryUri,
			exportName: `${this.stackName}:repositoryUri`,
		})
	}
}
