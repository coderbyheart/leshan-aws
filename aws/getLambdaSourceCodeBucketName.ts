import { CloudFormation } from 'aws-sdk'
import { stackName } from './stackName'

const cf = new CloudFormation({
	region: process.env.AWS_DEFAULT_REGION,
})

export const getLambdaSourceCodeBucketName = async (): Promise<string> =>
	cf
		.describeStacks({
			StackName: stackName('sourcecode'),
		})
		.promise()
		.then(({ Stacks }) => {
			if (Stacks === undefined || !Stacks.length) {
				throw new Error(`${stackName('sourcecode')} stack is not available.`)
			} else {
				const stack = Stacks[0]
				const BucketOutput =
					stack.Outputs &&
					stack.Outputs.find(({ OutputKey }) => OutputKey === 'bucketName')
				if (
					BucketOutput === undefined ||
					BucketOutput.OutputValue === undefined
				) {
					throw new Error(`${stackName('sourcecode')} bucket not found.`)
				}
				return BucketOutput.OutputValue
			}
		})
