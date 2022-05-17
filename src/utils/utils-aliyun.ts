import OSS from 'ali-oss'
import { moment } from '@/utils/utils-tool'

export interface OssOption {
	accessKeyId: string
	accessKeySecret: string
	stsToken: string
	region?: string
	bucket?: string
	refreshSTSToken?: () => Promise<OssOption>
	refreshSTSTokenInterval?: number
}
export function useOssModule(props: OssOption) {
	const client = new OSS({
		region: props.region || 'oss-cn-shenzhen',
		bucket: props.bucket || 'linvc',
		accessKeyId: props.accessKeyId,
		accessKeySecret: props.accessKeySecret,
		stsToken: props.stsToken,
		secure: true,
		refreshSTSTokenInterval: props.refreshSTSTokenInterval || 300000
	})

	const fileRename = (fileName: string): string => {
		const name = fileName.split('.').pop()?.toLowerCase() || 'jpg'
		return `${moment().format('YYYY-MM-DD')}/${Date.now()}.${name}`
	}

	const upload = (file: File): Promise<OSS.PutObjectResult> => {
		return new Promise(async (resolve, reject) => {
			try {
				const key = fileRename(file.name)
				const response = await client.put(key, file)
				resolve(response)
			} catch (e) {
				reject(e)
			}
		})
	}
}
