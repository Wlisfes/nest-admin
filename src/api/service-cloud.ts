import { request } from '@/utils/utils-request'

/**音视频列表-客户端**/
export function httpClientClouds(params: { page: number; size: number; type?: number; title?: string }) {
    return request<ICloud>({ url: `/api/cloud/client/list-node`, method: 'GET', params })
}

/**音视频详情-客户端**/
export function httpClientCloud(params: { id: number }) {
    return request<ICloud>({ url: `/api/cloud/client/info`, method: 'GET', params })
}

/**音视频列表-授权管理端**/
export function httpColumnCloud(params: {
    page: number
    size: number
    status?: number | null
    type?: number
    title?: string
}) {
    return request<ICloud>({ url: `/api/cloud/list-node`, method: 'GET', params })
}
