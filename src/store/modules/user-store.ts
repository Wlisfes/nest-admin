import { defineStore } from 'pinia'
import { httpLogin, httpUser, httpRegister } from '@/api'
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
        /**注册**/
        async register(props: { nickname: string; password: string; code: string; email: string }) {
            try {
                return await httpRegister({ ...props }).then(async ({ data: { token } }) => {
                    this.token = token
                    return await setToken(token)
                })
            } catch (e: unknown) {
                return Promise.reject(e)
            }
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
        /**退出登录**/
        logout(): Promise<void> {
            return new Promise(resolve => {
                const app = useAppStore()
                delToken().then(() => {
                    this.token = null
                    this.setUser()
                    app.setRouter([])
                    app.closeRoute('close-all')
                    resolve()
                })
            })
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
