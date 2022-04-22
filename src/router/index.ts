import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router'
import { authRoutes } from '@/router/auth-routes'
import { useUStore } from '@/store/modules/u-store'

/**
 * @param String meta.title     标题
 * @param String meta.icon      图标
 * @param Boolean meta.hidden   是否显示菜单
 * @param Boolean meta.root     是否为顶层菜单
 */
export const routes: RouteRecordRaw[] = [...authRoutes]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export function onEnter(path: string, query?: Record<string, any>) {
	const store = useUStore()
	if (path !== store.current) {
		router.push({ path, query: query })
	}
}

export function onReload(path?: string, query?: Record<string, any>) {
	const store = useUStore()
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
	const store = useUStore()
	router.beforeEach(async (to, form, next) => {
		window.$loading?.start()
		next()
	})

	router.afterEach((to, form) => {
		document.title = (to.meta?.title as string) || document.title
		if (to.path !== '/refresh') {
			store.setCurrent(to.path)
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
