import { SQSEvent } from 'aws-lambda'
import { Iot, IotData } from 'aws-sdk'

// Ensures the AWS Iot Thing exists
const getDevice = (iot: Iot) => {
	const devices: { [key: string]: Promise<void> } = {}
	return async (thingName: string): Promise<void> => {
		if (devices[thingName] === undefined)
			devices[thingName] = (async () => {
				try {
					await iot
						.describeThing({
							thingName,
						})
						.promise()
				} catch {
					await iot
						.createThing({
							thingName,
						})
						.promise()
				}
			})()
		return devices[thingName]
	}
}

const iot = new Iot()
const d = getDevice(iot)
const e = iot
	.describeEndpoint({ endpointType: 'iot:Data-ATS' })
	.promise()
	.then(({ endpointAddress }) => {
		if (endpointAddress === undefined) {
			throw new Error(`Failed to resolved AWS IoT endpoint`)
		}
		return endpointAddress
	})

export const handler = async (event: SQSEvent): Promise<void> => {
	console.log(JSON.stringify({ event }))

	const iotData = new IotData({ endpoint: await e })

	await Promise.all(
		event.Records.map(async (message) => {
			const deviceId = (message.attributes as any).MessageGroupId as string
			await d(deviceId)

			const objectId = parseInt(
				message.messageAttributes.objectId?.stringValue ?? '0',
				10,
			)
			const objectInstanceId = parseInt(
				message.messageAttributes.objectInstanceId?.stringValue ?? '0',
				10,
			)
			const resourceId = parseInt(
				message.messageAttributes.resourceId?.stringValue ?? '0',
				10,
			)
			const value = parseFloat(
				message.messageAttributes.Value?.stringValue ?? '0',
			)

			console.log({
				[deviceId]: `/${objectId}/${objectInstanceId}/${resourceId}: ${value}`,
			})

			await iotData
				.updateThingShadow({
					thingName: deviceId,
					payload: JSON.stringify({
						state: {
							reported: {
								[objectId]: {
									[objectInstanceId]: {
										[resourceId]: value,
									},
								},
							},
						},
					}),
				})
				.promise()
		}),
	)
}
