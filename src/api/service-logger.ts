import type { ILogger } from '@/api/pipe'
import { request } from '@/utils/utils-request'

/**Logger列表**/
export function httpColumnLogger(params: { page: number; size: number; status?: number | null; type?: number | null }) {
    return request<ILogger>({ url: `/api/logger/list-node`, method: 'GET', params })
}
