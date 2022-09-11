import type { IModule, IAction } from '@/interface/api/http-system'
import { request } from '@/utils/utils-request'

export interface Parameter {
    id: number
    page: number
    size: number
    status?: number | null
    name?: string | null
}

/**权限守卫列表**/
export function httpRowGuard(params: Pick<Parameter, 'page' | 'size' | 'name' | 'status'>) {
    return request<IModule>({ url: `/api/module/list-node`, method: 'GET', params })
}
