import * as CloudFormation from '@aws-cdk/core'
import * as ECR from '@aws-cdk/aws-ecr'
import * as EC2 from '@aws-cdk/aws-ec2'
import * as ECS from '@aws-cdk/aws-ecs'
import * as Logs from '@aws-cdk/aws-logs'

export class LeshanFargate extends CloudFormation.Resource {
	public readonly fargateService: ECS.IFargateService
	public readonly cluster: ECS.ICluster

	public constructor(
		parent: CloudFormation.Stack,
		id: string,
		{
			ecr,
		}: {
			ecr: ECR.IRepository
		},
	) {
		super(parent, id)

		const vpc = new EC2.Vpc(this, 'VPC', {
			cidr: '10.3.0.0/16',
			maxAzs: 2,
			subnetConfiguration: [
				{
					subnetType: EC2.SubnetType.PUBLIC,
					name: 'PublicSubnetOne',
					cidrMask: 25,
				},
				{
					subnetType: EC2.SubnetType.PUBLIC,
					name: 'PublicSubnetTwo',
					cidrMask: 25,
				},
			],
		})

		this.cluster = new ECS.Cluster(this, 'Cluster', {
			vpc: vpc,
		})

		const runServerTaskDef = new ECS.FargateTaskDefinition(this, 'RunServer', {
			memoryLimitMiB: 512,
			cpu: 256,
		})

		const container = runServerTaskDef.addContainer('ServerContainer', {
			image: ECS.ContainerImage.fromEcrRepository(ecr),
			environment: {
				AWS_REGION: parent.region,
			},
			cpu: 256,
			memoryLimitMiB: 512,
			memoryReservationMiB: 512,
			logging: new ECS.AwsLogDriver({
				streamPrefix: 'leshan',
				logRetention: Logs.RetentionDays.ONE_WEEK,
			}),
			essential: true,
			readonlyRootFilesystem: false,
		})
		container.addPortMappings({
			containerPort: 5683,
			protocol: ECS.Protocol.UDP,
		})
		container.addPortMappings({
			containerPort: 5684,
			protocol: ECS.Protocol.UDP,
		})
		container.addPortMappings({
			containerPort: 5783,
			protocol: ECS.Protocol.UDP,
		})
		container.addPortMappings({
			containerPort: 5784,
			protocol: ECS.Protocol.UDP,
		})
		container.addPortMappings({
			containerPort: 8080,
		})
		container.addPortMappings({
			containerPort: 8081,
		})

		const securityGroup = new EC2.SecurityGroup(this, 'leshanSG', {
			vpc,
			allowAllOutbound: true,
			description: 'Security group for Leshan',
		})
		securityGroup.addEgressRule(EC2.Peer.anyIpv4(), EC2.Port.allTcp())
		securityGroup.addIngressRule(EC2.Peer.anyIpv4(), EC2.Port.tcp(8080))
		securityGroup.addIngressRule(EC2.Peer.anyIpv4(), EC2.Port.tcp(8081))
		securityGroup.addIngressRule(EC2.Peer.anyIpv4(), EC2.Port.udp(5683))
		securityGroup.addIngressRule(EC2.Peer.anyIpv4(), EC2.Port.udp(5684))
		securityGroup.addIngressRule(EC2.Peer.anyIpv4(), EC2.Port.udp(5783))
		securityGroup.addIngressRule(EC2.Peer.anyIpv4(), EC2.Port.udp(5784))

		this.fargateService = new ECS.FargateService(this, 'FargateService', {
			cluster: this.cluster,
			taskDefinition: runServerTaskDef,
			securityGroup,
			desiredCount: 1,
			minHealthyPercent: 0,
			maxHealthyPercent: 100,
			assignPublicIp: true,
		})
	}
}
