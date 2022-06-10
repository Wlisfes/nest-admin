import Cookie from 'js-cookie'

/**
 * token存储唯一key
 */
export const APP_AUTH_TOKEN = 'APP_AUTH_TOKEN'

/**
 * 读取token
 * @returns string | null
 */
export function getToken() {
    return Cookie.get(APP_AUTH_TOKEN) || null
}

/**
 *写入token
 * @param token string
 * @returns string
 */
export async function setToken(token: string) {
    return Cookie.set(APP_AUTH_TOKEN, token, { expires: 1 })
}

/**
 *清除token
 * @returns void
 */
export async function delToken() {
    return Cookie.remove(APP_AUTH_TOKEN)
}

/**
 * 读取cookie
 * @param key string
 * @returns any
 */
export function getCookie(key: string) {
    const data = Cookie.get(key)
    return data ? JSON.parse(data) : null
}

/**
 *写入cookie
 * @param key string
 * @param data any
 * @param expires number | undefined
 * @returns any
 */
export function setCookie(key: string, data: any, expires?: number) {
    if (!expires) {
        return Cookie.set(key, JSON.stringify(data))
    }
    return Cookie.set(key, JSON.stringify(data), {
        expires: new Date(new Date().getTime() + expires)
    })
}

/**
 *清除cookie
 * @param key string
 * @returns void
 */
export function delCookie(key: string) {
    return Cookie.remove(key)
}
