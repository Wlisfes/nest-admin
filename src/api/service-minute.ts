import { request } from '@/utils/utils-request'

/**收录信息-授权管理端**/
export function httpClientMinute(params: { page: number; size: number; source?: number }) {
    return request<IMinute>({ url: `/api/minute/client/list-node`, method: 'GET', params })
}
