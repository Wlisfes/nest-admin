import type { IRoute } from '@/api/pipe'
import { request } from '@/utils/utils-request'

/**角色路由菜单**/
export function httpRoute() {
    return request<Array<IRoute>>({ url: `/api/route/role`, method: 'GET' })
}
