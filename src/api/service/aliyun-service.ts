import { request } from '@/utils/utils-request'
import type { IDemanOption, IDemanFileOption } from '@/api/pipe'

/**获取播放信息**/
export function httpCloudCheck(params: { VideoId: string; AuthTimeout: number }) {
	return request<IDemanOption>({ url: `/api/aliyun/play-info`, method: 'GET', params })
}

/**获取播放文件源信息**/
export function httpCloudFile(params: { VideoId: string; AuthTimeout: number }) {
	return request<IDemanFileOption>({ url: `/api/aliyun/play-file`, method: 'GET', params })
}
