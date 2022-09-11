import type { IRole, IModule, IAction, ILogger } from '@/interface/api/http-system'
import { request } from '@/utils/utils-request'

export interface Parameter {
    id: number
    page: number
    size: number
    status?: number | null
    name?: string | null
    type?: number | null
}

/**权限守卫列表**/
export function httpRowGuard(params: Pick<Parameter, 'page' | 'size' | 'name' | 'status'>) {
    return request<IModule>({ url: `/api/module/list-node`, method: 'GET', params })
}

/**权限键列表**********************************************************************************/
export function httpRowAction(params: Pick<Parameter, 'page' | 'size' | 'name' | 'status'>) {
    return request<IAction>({ url: `/api/module/action/list-node`, method: 'GET', params })
}

/**Logger列表**********************************************************************************/
export function httpRowLogger(params: Pick<Parameter, 'page' | 'size' | 'status' | 'type'>) {
    return request<ILogger>({ url: `/api/logger/list-node`, method: 'GET', params })
}

/**角色列表************************************************************************************/
export function httpRowRole(params: Pick<Parameter, 'page' | 'size' | 'status'>) {
    return request<IRole>({ url: `/api/role/list-node`, method: 'GET', params })
}
