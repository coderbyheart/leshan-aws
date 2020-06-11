import { LeshanAWSApp } from './LeshanAWSApp'
import { stackName } from './stackName'
import { CloudFormation, Iot } from 'aws-sdk'
import { Outputs } from './ECRStack'
import { prepareResources } from './prepare-resources'

const cf = new CloudFormation()
const iot = new Iot()

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

	const iotEndpoint = await iot
		.describeEndpoint({ endpointType: 'iot:Data-ATS' })
		.promise()
		.then(({ endpointAddress }) => {
			if (endpointAddress === undefined) {
				throw new Error(`Failed to resolved AWS IoT endpoint`)
			}
			return endpointAddress
		})

	new LeshanAWSApp({
		ecrRepositoryArn: ecrRepoArnOutput.OutputValue as string,
		...res,
		iotEndpoint,
	}).synth()
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})
