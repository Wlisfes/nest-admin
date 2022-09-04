import { request } from '@/utils/utils-request'

/**收录列表-授权管理端**/
export function httpColumnMinute(params: {
    page: number
    size: number
    status?: number | null
    name?: string | null
    source?: number | null
}) {
    return request<IRecord>({ url: `/api/minute/list-node`, method: 'GET', params })
}
