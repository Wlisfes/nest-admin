import type { IUser } from '@/api/pipe'
import { request } from '@/utils/utils-request'

/**登录**/
export function httpLogin(data: { account: string; password: string; code: string }) {
    return request<{ token: string }>({ url: `/api/user/login`, method: 'POST', data })
}

/**注册用户**/
export function httpRegister(params: { nickname: string; password: string; code: string; email: string }) {
    return request<IUser>({
        url: `/api/user/register`,
        method: 'POST',
        data: params
    })
}

/**用户信息**/
export function httpUser() {
    return request<IUser>({ url: `/api/user/info`, method: 'GET' })
}

/**用户列表**/
export function httpColumnUser(params: {
    page: number
    size: number
    status?: number
    primary?: string
    keyword?: string
}) {
    return request<IUser>({ url: `/api/user/list-node`, method: 'GET', params })
}
