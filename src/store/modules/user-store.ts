import type { IUser, IRole } from '@/api/pipe'
import { defineStore } from 'pinia'
import { httpLogin, httpUser } from '@/api/service'
import { setToken, getToken, delToken } from '@/utils/utils-cookie'

export interface UserStore {
    uid: number | null
    nickname: string | null
    email: string | null
    avatar: string | null
    mobile: number | string | null
    token: string | null
    role: Array<IRole>
}

export const useUserStore = defineStore({
    id: 'user-store',
    state: (): UserStore => ({
        uid: null,
        nickname: null,
        email: null,
        avatar: null,
        mobile: null,
        token: getToken(),
        role: []
    }),
    actions: {
        /**登录**/
        async login(props: { account: string; password: string; code: string }) {
            try {
                return await httpLogin({ ...props }).then(response => {
                    this.setToken(response.data.token)
                    return this.httpUser()
                })
            } catch (e: unknown) {
                return Promise.reject(e)
            }
        },
        /**退出登录**/
        async logout() {
            this.setUser()
            return await delToken().then(() => {
                this.token = null
            })
        },
        /**拉取用户信息、权限**/
        async httpUser() {
            try {
                const { data } = await httpUser()
                return this.setUser(data)
            } catch (e: unknown) {
                return Promise.reject(e)
            }
        },
        async setToken(token: string) {
            this.token = token || null
            return setToken(token)
        },
        setUser(props?: IUser) {
            this.uid = props?.uid || null
            this.nickname = props?.nickname || null
            this.email = props?.email || null
            this.avatar = props?.avatar || null
            this.mobile = props?.mobile || null
            this.role = props?.role || []
            return props
        }
    }
})
