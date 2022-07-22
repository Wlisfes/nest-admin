import type { IRole } from '@/api/pipe'
import { request } from '@/utils/utils-request'

/**角色列表**/
export function httpColumnRole(params: { page: number; size: number }) {
    return request<IRole>({ url: `/api/role/list-node`, method: 'GET', params })
}
