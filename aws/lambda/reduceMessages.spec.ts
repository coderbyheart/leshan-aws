import { reduceMessages } from './processQueue'

const event = {
	Records: [
		{
			messageId: '215a3a46-bc00-42ad-9b80-70f7be532966',
			receiptHandle:
				'AQEBfCgh8QeycVREsl1finvHGwXEib3khhd+G777TpoOnU+yyRcOI8CnqLvcACnmYBaOZ9AP/ZTihPSSIuHSOe4U41Cv3Hk+diqW1Cuu8gqZpjP0DMvCrB30SWTVozwDGBG9fRR/4GKuNCY+Bs+HssIQUvMoHvQaDatPJyg+Vc9s4UUc8JqV+jyA4AKKe/mf+LndI2QGoWQmREDBM3h9eNp979VPN7WYyfkcWCxjHEVivniy++KVqduY/Oo5lbvo1QuLSt38tOG+fPEn1Mm2LW94beD2iKRpdDOei1CBIa9XiAeatvaIm0S2vEUDfSz7UTJ/',
			body: 'testlwm2mclient\t/3/0/9\t14',
			attributes: {
				ApproximateReceiveCount: '1',
				SentTimestamp: '1591785164082',
				SequenceNumber: '18854241075714543616',
				MessageGroupId: 'testlwm2mclient',
				SenderId: 'AIDA6QBK2476U3OKVQF7O',
				MessageDeduplicationId: 'a112b50f-466d-4189-b4fa-80bf27d1e6c0',
				ApproximateFirstReceiveTimestamp: '1591787114080',
			},
			messageAttributes: {
				objectInstanceId: {
					stringValue: '0',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				resourceId: {
					stringValue: '9',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				Endpoint: {
					stringValue: 'testlwm2mclient',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				Value: {
					stringValue: '14',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				objectId: {
					stringValue: '3',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
			},
			md5OfMessageAttributes: 'fc1e4898b88ce131b89166100d01c452',
			md5OfBody: '8a32caa2e73f171dab85c0ff57884a4f',
			eventSource: 'aws:sqs',
			eventSourceARN:
				'arn:aws:sqs:eu-north-1:996522256381:leshan-middleware-leshan-middleware.fifo',
			awsRegion: 'eu-north-1',
		},
		{
			messageId: 'b4c81fab-fef2-439d-9387-953f7136340a',
			receiptHandle:
				'AQEB6ZHre60VtY80FZvIFlX7vYbpvfp46B1pGPLqmIuyMCu1fK9XCLsv6lvNGw34Y04uK1J2RK2SLY5nOAFuRWfPRtUrMWklIAh4hf051YLez/9/8aE54DT5oFmFhBiA4fp94qALByvLJEA09pVb7A2dOdg8lCFngbbU8gWdAljQXKRm91citxbCDbRjswxn4hAqphUVEAmil9vKx1LCyFbeyJ10+oZ3589mgBqt4rVfUSGjC4uZEKVwP71Pxl80l6fpx3m3gOCKn0lzcjzvuqKY92h1sF2hyho1L/YuZvLhy+s/FUohcfJtErUipiqSq3fM',
			body: 'nrf-352656100378903\t/3347/1/5501\t4',
			attributes: {
				ApproximateReceiveCount: '1',
				SentTimestamp: '1591799186077',
				SequenceNumber: '18854244665345263616',
				MessageGroupId: 'nrf-352656100378903',
				SenderId: 'AIDA6QBK2476U3OKVQF7O',
				MessageDeduplicationId: 'ed5dd27a-d18d-4551-9e04-06d695b953d2',
				ApproximateFirstReceiveTimestamp: '1591799186201',
			},
			messageAttributes: {
				objectInstanceId: {
					stringValue: '1',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				resourceId: {
					stringValue: '5501',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				Endpoint: {
					stringValue: 'nrf-352656100378903',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				Value: {
					stringValue: '4',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				objectId: {
					stringValue: '3347',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
			},
			md5OfBody: 'a9a2b05ae03ac471fe62229838b6b986',
			md5OfMessageAttributes: '89cddfea6c3b12bc8e6d3564878e8eab',
			eventSource: 'aws:sqs',
			eventSourceARN:
				'arn:aws:sqs:eu-north-1:996522256381:leshan-middleware-leshan-middleware.fifo',
			awsRegion: 'eu-north-1',
		},
		{
			messageId: 'dc907f07-3534-49b9-bda0-f9991f1f28d7',
			receiptHandle:
				'AQEBOraP25lgcBGRYyXmjth9MWQvQ3y0A8ECuQNOstJVNh1RuwvkcgGuvV++N6m3mkRBOxYRSKf18T0QMrrPJ0l0gqH7FMqbwp4e18nuSKhLzyEitEDBrlJXDgL1zhKphReALST5Ly0Jdsgwf4cWyQhz7hy5LlFbwAdcTwiBTbPKhUhIUgKQtE6QD+qmlP2hH+U5/CcyHpkpfKoNUzio3KGmXUi26y21tL+57XwKcwCGgU048Nlli6CkmYMLlz+4VuFfRDG7V/IUK3hx2BWhA5Tz6Z8pEsAxReqxIkEn9jhHsDfUqcMHGyyvx5+88igf2N45',
			body: 'testlwm2mclient\t/3/0/9\t39',
			attributes: {
				ApproximateReceiveCount: '1',
				SentTimestamp: '1591785184093',
				SequenceNumber: '18854241080837359616',
				MessageGroupId: 'testlwm2mclient',
				SenderId: 'AIDA6QBK2476U3OKVQF7O',
				MessageDeduplicationId: '347be323-407e-464b-93d4-8d8f5b5c339c',
				ApproximateFirstReceiveTimestamp: '1591787114080',
			},
			messageAttributes: {
				objectInstanceId: {
					stringValue: '0',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				resourceId: {
					stringValue: '9',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				Endpoint: {
					stringValue: 'testlwm2mclient',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				Value: {
					stringValue: '39',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				objectId: {
					stringValue: '3',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
			},
			md5OfMessageAttributes: '41e342ff1e1da2a1802e94ae1765196f',
			md5OfBody: 'a7d7fa7c08014fcb089255c446343904',
			eventSource: 'aws:sqs',
			eventSourceARN:
				'arn:aws:sqs:eu-north-1:996522256381:leshan-middleware-leshan-middleware.fifo',
			awsRegion: 'eu-north-1',
		},
		{
			messageId: 'a6b4258e-68de-44b0-9329-49d8d66dd59a',
			receiptHandle:
				'AQEB+uiDxyi5qs5GLfDWjsWeNKK/wC9jxaMfkz5IsWEGo8UABbZrnebhYYcLhce66p/SEITCMbQphukoPv0A321CBxEyhwG64ugFgdqaW9Iei5ordk2wMDMjsDzfnElHrLEJTRrUIyg0rvW7uj8d9Z0hGKYUzXo1B/8qDROY9WiVW4cDhcrNNeWyOQGOJ6YgCrMt1urUTtrM4q35PVVRh2X+68qXimWYhT/OhpTGD+2rfEq8emzRxuwhvQpz4FsLDleLsLueB50Dpo9/iyuxQsAlx2mkXMWv+dialuSwP6OKM/WEYhn3Cd/KWI55j7vEKrAE',
			body: 'testlwm2mclient\t/3/0/9\t53',
			attributes: {
				ApproximateReceiveCount: '1',
				SentTimestamp: '1591785210135',
				SequenceNumber: '18854241087504111616',
				MessageGroupId: 'testlwm2mclient',
				SenderId: 'AIDA6QBK2476U3OKVQF7O',
				MessageDeduplicationId: '4a394f3a-38eb-43ec-808a-179f504832d3',
				ApproximateFirstReceiveTimestamp: '1591787114080',
			},
			messageAttributes: {
				objectInstanceId: {
					stringValue: '0',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				resourceId: {
					stringValue: '9',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				Endpoint: {
					stringValue: 'testlwm2mclient',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				Value: {
					stringValue: '53',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				objectId: {
					stringValue: '3',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
			},
			md5OfMessageAttributes: '6bd6bed96c7f1e61e14a0e05cf51df9f',
			md5OfBody: '5bd16c862c906268b515e74f9577afa6',
			eventSource: 'aws:sqs',
			eventSourceARN:
				'arn:aws:sqs:eu-north-1:996522256381:leshan-middleware-leshan-middleware.fifo',
			awsRegion: 'eu-north-1',
		},
		{
			messageId: '2c3cf3c0-47bb-4163-b2f6-7c8fbe73bd59',
			receiptHandle:
				'AQEBFHEaF4U7X8gJJspXtk1zhGCb7V1cQKTVHjicCH21AQJc4Hv/As7tmpGk8c41veWNHvt5qvttirWTf9Nt1N82+BT7q1mhQQAw0XjvGbswqNC2bthOE0zkKKSZt661ohleokwT2cW3iEd2N0yWUdaPQNjNB3evfxL4sFYFCHpPila8PmcOQDkheMp1Dk59jFoMw5JYcZH3dlBXIB+xEG5RcIFUy1wS3XdO+o7cnhUnKFE4iiwRCxWg410Cmf8kMMKRuSSjHx0RrMd2d3S8CLFxOddvClSr0JLRyFnAuVCVPj2rx08xccan5WRY+3cUh70w',
			body: 'nrf-352656100378903\t/3347/0/5501\t3',
			attributes: {
				ApproximateReceiveCount: '1',
				SentTimestamp: '1591799186060',
				SequenceNumber: '18854244665340911872',
				MessageGroupId: 'nrf-352656100378903',
				SenderId: 'AIDA6QBK2476U3OKVQF7O',
				MessageDeduplicationId: 'fb0b9a2a-c6ea-4a56-80ce-e87402f1e914',
				ApproximateFirstReceiveTimestamp: '1591799186060',
			},
			messageAttributes: {
				objectInstanceId: {
					stringValue: '0',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				resourceId: {
					stringValue: '5501',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				Endpoint: {
					stringValue: 'nrf-352656100378903',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				Value: {
					stringValue: '3',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
				objectId: {
					stringValue: '3347',
					stringListValues: [],
					binaryListValues: [],
					dataType: 'String',
				},
			},
			md5OfMessageAttributes: 'f01aa4cc7a78380eba125a90020a9827',
			md5OfBody: 'e3d4a0563ecff9c5e2405e70f72dcb40',
			eventSource: 'aws:sqs',
			eventSourceARN:
				'arn:aws:sqs:eu-north-1:996522256381:leshan-middleware-leshan-middleware.fifo',
			awsRegion: 'eu-north-1',
		},
	],
}

describe('reduceMessages', () => {
	it('should reduce an SQS event', () => {
		expect(reduceMessages(event)).toEqual({
			'nrf-352656100378903': {
				3347: {
					0: {
						5501: 3,
					},
				},
			},
			testlwm2mclient: {
				3: {
					0: {
						9: 53,
					},
				},
			},
		})
	})
})
