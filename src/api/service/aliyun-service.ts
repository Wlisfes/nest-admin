import { request } from '@/utils/utils-request'
import type { IDemanOption } from '@/api/pipe'

/**获取播放信息**/
export function httpCloudCheck(params: { VideoId: string; AuthTimeout: number }) {
	return request<IDemanOption>({ url: `/api/aliyun/play-info`, method: 'GET', params })
}
