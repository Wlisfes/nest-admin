import type { IUser } from '@/api/pipe'
import { request } from '@/utils/utils-request'

/**登录**/
export function httpLogin(data: { account: string; password: string; code: string }) {
    return request<{ token: string }>({ url: `/api/user/login`, method: 'POST', data })
}

/**用户信息**/
export function httpUser() {
    return request<IUser>({ url: `/api/user/info`, method: 'GET' })
}
