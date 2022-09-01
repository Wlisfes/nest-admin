import { request } from '@/utils/utils-request'

/**角色列表**/
export function httpColumnRole(params: { page: number; size: number; status?: number | null }) {
    return request<IRole>({ url: `/api/role/list-node`, method: 'GET', params })
}
