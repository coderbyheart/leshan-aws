import * as path from 'path'
import { promises as fs } from 'fs'
import {
	packBaseLayer,
	packLayeredLambdas,
	WebpackMode,
	LayeredLambdas,
} from '@bifravst/package-layered-lambdas'
import { getLambdaSourceCodeBucketName } from './getLambdaSourceCodeBucketName'

export type Lambdas = {
	processQueue: string
}

export const prepareResources = async ({
	rootDir,
}: {
	rootDir: string
}): Promise<{
	sourceCodeBucketName: string
	baseLayerZipFileName: string
	lambdas: LayeredLambdas<Lambdas>
}> => {
	// Pack the lambdas
	const outDir = path.resolve(rootDir, 'dist', 'lambdas')
	try {
		await fs.stat(outDir)
	} catch (_) {
		await fs.mkdir(outDir)
	}
	const sourceCodeBucketName = await getLambdaSourceCodeBucketName()
	const baseLayerZipFileName = await packBaseLayer({
		srcDir: rootDir,
		outDir,
		Bucket: sourceCodeBucketName,
	})
	const lambdas = await packLayeredLambdas<Lambdas>({
		id: 'bifravst',
		mode: WebpackMode.production,
		srcDir: rootDir,
		outDir,
		Bucket: sourceCodeBucketName,
		lambdas: {
			processQueue: path.resolve(rootDir, 'aws', 'lambda', 'processQueue.ts'),
		},
		tsConfig: path.resolve(rootDir, 'tsconfig.json'),
	})

	return {
		sourceCodeBucketName,
		baseLayerZipFileName,
		lambdas,
	}
}
