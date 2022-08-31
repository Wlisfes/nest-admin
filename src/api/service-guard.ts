import { request } from '@/utils/utils-request'

/**权限键列表**/
export function httpColumnAction(params: { page: number; size: number; name?: string; status?: number | null }) {
    return request<IAction>({ url: `/api/module/action/list-node`, method: 'GET', params })
}
