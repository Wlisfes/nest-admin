import { request } from '@/utils/utils-request'

/**音视频列表-客户端**/
export function httpClientClouds(params: { page: number; size: number; type?: number; title?: string }) {
	return request({ url: `/api/cloud/client/list-node`, method: 'GET', params })
}

/**音视频详情-客户端**/
export function httpClientCloud(params: { id: number }) {
	return request({ url: `/api/cloud/client/info`, method: 'GET', params })
}
