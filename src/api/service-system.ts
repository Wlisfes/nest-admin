import type { IUser, IRole, IModule, IAction, ILogger } from '@/interface/api/http-system'
import { request } from '@/utils/utils-request'

export interface Parameter {
    id: number
    uid: number
    page: number
    size: number
    password: string | number
    nickname: string
    role: Array<number>
    status?: number | null
    name?: string | null
    type?: number | null
    primary?: string | null
    keyword?: string | null
    email?: string | null
    comment?: string | null
    mobile?: string | number | null
    avatar?: string
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

/**用户信息************************************************************************************/
export function httpUser() {
    return request<IUser>({ url: `/api/user/info`, method: 'GET' })
}

/**用户信息**/
export function httpOneUser(params: Pick<Parameter, 'uid'>) {
    return request<IUser>({ url: `/api/user/uid-info`, method: 'GET', params })
}

/**用户列表**/
export function httpRowUser(params: Pick<Parameter, 'page' | 'size' | 'status' | 'primary' | 'keyword'>) {
    return request<IUser>({ url: `/api/user/list-node`, method: 'GET', params })
}

/**修改用户状态**/
export function httpPutUser(params: Pick<Parameter, 'uid'>) {
    return request<IUser>({ url: `/api/user/cutover`, method: 'PUT', data: params })
}

/**重置用户密码**/
export function httpResetUser(params: Pick<Parameter, 'password' | 'uid'>) {
    return request<IUser>({ url: `/api/user/update-reset`, method: 'PUT', data: params })
}

/**修改用户信息**/
export function httpUpdateUser(
    params: Pick<Parameter, 'uid' | 'nickname' | 'status' | 'role' | 'email' | 'avatar' | 'mobile' | 'comment'>
) {
    return request<IUser>({ url: `/api/user/update`, method: 'PUT', data: params })
}
