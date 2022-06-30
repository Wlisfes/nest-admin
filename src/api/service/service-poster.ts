import type { IPoster } from '@/api/pipe'
import { request } from '@/utils/utils-request'

/**图床列表**/
export function httpColumnPoster(params: { page: number; size: number; status?: number | null; type?: number | null }) {
    return request<IPoster>({ url: `/api/poster/list-node`, method: 'GET', params })
}
