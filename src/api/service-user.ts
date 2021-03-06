import { request } from '@/utils/utils-request'

/**登录**/
export function httpLogin(data: { account: string; password: string; code: string }) {
    return request<{ token: string }>({ url: `/api/user/login`, method: 'POST', data })
}

/**注册用户**/
export function httpRegister(params: { nickname: string; password: string; code: string; email: string }) {
    return request<IUser>({ url: `/api/user/register`, method: 'POST', data: params })
}

/**邮箱注册验证码**/
export function httpSendEmail(params: { email: string }) {
    return request<IUser>({ url: `/api/nodemailer/register-code`, method: 'POST', data: params })
}

/**用户信息**/
export function httpUser() {
    return request<IUser>({ url: `/api/user/info`, method: 'GET' })
}

/**用户信息**/
export function httpOneUser(params: { uid: number }) {
    return request<IUser>({ url: `/api/user/uid-info`, method: 'GET', params })
}

/**用户列表**/
export function httpColumnUser(params: {
    page: number
    size: number
    status?: number | null
    primary?: string | null
    keyword?: string | null
}) {
    return request<IUser>({ url: `/api/user/list-node`, method: 'GET', params })
}

/**修改用户状态**/
export function httpCutoverUser(params: { uid: number }) {
    return request<IUser>({ url: `/api/user/cutover`, method: 'PUT', data: params })
}

/**重置用户密码**/
export function httpUpdatePwsUser(params: { uid: number; password: string }) {
    return request<IUser>({ url: `/api/user/update-reset`, method: 'PUT', data: params })
}

/**修改用户信息**/
export function httpUpdateUser(params: {
    uid: number
    nickname: string
    status: number
    role: Array<number>
    email?: string | null
    avatar?: string | null
    mobile?: string | null
    comment?: string | null
}) {
    return request<IUser>({ url: `/api/user/update`, method: 'PUT', data: params })
}
