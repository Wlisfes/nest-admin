import type { IUser, IRole } from '@/api/pipe'
import { defineStore } from 'pinia'
import { httpLogin, httpUser } from '@/api/service'
import { setToken, getToken, delToken } from '@/utils/utils-cookie'
import { useAppStore } from '@/store/modules/app-store'

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
                return await httpLogin({ ...props }).then(async ({ data: { token } }) => {
                    this.token = token
                    return await setToken(token)
                })
            } catch (e: unknown) {
                return Promise.reject(e)
            }
        },
        /**退出登录**/
        async logout() {
            const app = useAppStore()
            await delToken()
            this.setUser()
            app.setRouter([])
            return (this.token = null)
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
