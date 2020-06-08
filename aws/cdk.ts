import { ServerApp } from './ServerApp'
import { stackName } from './stackName'
import { CloudFormation } from 'aws-sdk'
import { Outputs } from './ECRStack'

const cf = new CloudFormation()

const main = async () => {
	const { Stacks } = await cf
		.describeStacks({
			StackName: stackName('ecr'),
		})
		.promise()

	const ecrRepoArnOutput = Stacks?.[0].Outputs?.find(
		({ OutputKey }) => OutputKey === Outputs.repositoryArn,
	)

	if (!ecrRepoArnOutput) {
		throw new Error(`ECR not found.`)
	}

	new ServerApp(stackName(), {
		ecrRepositoryArn: ecrRepoArnOutput.OutputValue as string,
	}).synth()
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
