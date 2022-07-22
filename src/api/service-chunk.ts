import { request } from '@/utils/utils-request'

/**版本资源列表**/
export function httpColumnChunk(params: { page: number; size: number }) {
    return request<IChunk>({ url: `/api/chunk/list-node`, method: 'GET', params })
}

/**创建版本资源**/
export function httpCreateChunk(params: { url: string; path: string; name: string; version: number | null }) {
    return request<IChunk>({ url: `/api/chunk/create`, method: 'POST', data: params })
}
