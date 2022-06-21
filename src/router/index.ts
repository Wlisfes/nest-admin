import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAppStore } from '@/store/modules/app-store'
import { useUserStore } from '@/store/modules/user-store'
import { getToken } from '@/utils/utils-cookie'
import { bfs } from '@/utils/utils-route'

export const router = createRouter({
    history: createWebHistory(),
    routes
})

export function onEnter(path: string, query?: Record<string, any>) {
    const store = useAppStore()
    if (path !== store.current) {
        router.push({ path, query: query })
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
    //白名单页面
    const whitelist = ['/login', '/register']
    const app = useAppStore()
    const user = useUserStore()

    router.beforeEach(async (to, form, next) => {
        window.$loading?.start()
        console.log(to)
        if (getToken()) {
            if (user.role.length === 0) {
                try {
                    await user.httpUser()
                } catch (e) {}
            }

            if (whitelist.includes(to.path)) {
                next({ path: '/', replace: true })
                window.$loading?.finish()
            } else {
                next()
            }
        } else if (to.meta.auth) {
            next({ path: '/login', replace: true })
            window.$loading?.finish()
        } else {
            next()
        }
    })

    router.afterEach((to, form) => {
        document.title = (to.meta?.title as string) || document.title

        //hidden等于false的页面才储存到store
        if (!to.meta.hidden) {
            app.setCurrent(to.path)
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
