import { LambdaSourceCodeStorageApp } from './LambdaSourceCodeStorageApp'
import { stackName } from './stackName'

new LambdaSourceCodeStorageApp({
	stackId: stackName('sourcecode'),
}).synth()
