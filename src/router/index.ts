import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAppStore } from '@/store/modules/app-store'
import { useUserStore } from '@/store/modules/user-store'
import { getToken } from '@/utils/utils-cookie'

export const router = createRouter({
    history: createWebHistory(),
    routes
})

export function onEnter(path: string, query?: Record<string, any>, props?: Record<string, any>) {
    const store = useAppStore()
    if (path !== store.current) {
        router.push({ path, query: query, replace: props?.replace ?? false })
    }
}

export function onReload(path?: string, query?: Record<string, any>) {
    const store = useAppStore()
    router.replace({
        path: '/refresh',
        query: {
            ...query,
            url: path ?? store.current
        }
    })
}

//路由守卫
export function setupGuardRouter(router: Router) {
    const white = ['/login', '/register']
    const app = useAppStore()
    const user = useUserStore()

    router.beforeEach(async (to, form, next) => {
        window.$loading?.start()
        const token = getToken()

        if (token) {
            if (!user.uid || app.router.length === 0) {
                try {
                    await user.httpUser()
                    await app.httpRoute(user.role)
                } catch (e) {
                    await user.logout()
                    next({ path: '/login', replace: true })
                }
            }

            next()
        } else {
            next()
        }
    })

    router.afterEach((to, form) => {
        document.title = (to.meta?.title as string) || document.title

        app.setCurrent(to.path)
        if (to.meta?.route) {
            app.setMultiple({ key: to.path, meta: to.meta as any })
        }

        window.$loading?.finish()
    })
}

//挂载路由
export function setupRouter(app: App<Element>) {
    app.use(router)
    //挂载守卫
    setupGuardRouter(router)
}

export default router
