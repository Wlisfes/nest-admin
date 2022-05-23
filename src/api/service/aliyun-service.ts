import { request } from '@/utils/utils-request'

/**获取播放信息**/
export function httpCloudCheck(params: { VideoId: string; AuthTimeout: number }) {
	return request({ url: `/api/aliyun/play-info`, method: 'GET', params })
}
