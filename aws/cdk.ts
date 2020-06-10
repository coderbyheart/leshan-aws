import { LeshanAWSApp } from './LeshanAWSApp'
import { stackName } from './stackName'
import { CloudFormation } from 'aws-sdk'
import { Outputs } from './ECRStack'
import { prepareResources } from './prepare-resources'

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

	const res = await prepareResources({
		rootDir: process.cwd(),
	})

	new LeshanAWSApp({
		ecrRepositoryArn: ecrRepoArnOutput.OutputValue as string,
		...res,
	}).synth()
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
