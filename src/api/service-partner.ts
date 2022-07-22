import { request } from '@/utils/utils-request'

/**日志列表-客户端**/
export function httpClientPartner(params: { page: number; size: number }) {
    return request<IPartner>({ url: `/api/partner/client/list-node`, method: 'GET', params })
}
