import { stackName } from './stackName'
import { ECRApp } from './ECRApp'

new ECRApp({
	stackId: stackName('ecr'),
})
