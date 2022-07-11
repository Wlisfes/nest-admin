import { request } from '@/utils/utils-request'

/**版本资源列表**/
export function httpColumnChunk(params: { page: number; size: number }) {
    return request({ url: `/api/chunk/list-node`, method: 'GET', params })
}
