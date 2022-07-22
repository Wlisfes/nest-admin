import { request } from '@/utils/utils-request'

/**图床列表**/
export function httpColumnPoster(params: { page: number; size: number; status?: number | null; type?: number | null }) {
    return request<IPoster>({ url: `/api/poster/list-node`, method: 'GET', params })
}

/**修改图床状态**/
export function httpCutoverPoster(params: { id: number }) {
    return request<IPoster>({ url: `/api/poster/cutover`, method: 'PUT', data: params })
}

/**删除图床**/
export function httpDeletePoster(params: { id: number }) {
    return request<IPoster>({ url: `/api/poster/del`, method: 'DELETE', params })
}

/**创建图床**/
export function httpCreatePoster(params: { type: number; url: string; path: string }) {
    return request<IPoster>({ url: `/api/poster/create`, method: 'POST', data: params })
}
