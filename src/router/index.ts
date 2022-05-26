import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router'
import { authRoutes } from '@/router/auth-routes'
import { baseRoutes } from '@/router/base-routes'
import { layerRoutes } from '@/router/layer-routes'
import { useAppStore } from '@/store/modules/app-store'
import { getToken } from '@/utils/utils-cookie'

/**
 * @param String meta.title     标题
 * @param String meta.icon      图标
 * @param Boolean meta.hidden   是否显示菜单
 * @param Boolean meta.root     是否为顶层菜单
 */
export const routes: RouteRecordRaw[] = [...baseRoutes, ...authRoutes, ...layerRoutes]

const router = createRouter({
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
	const whitelist = ['/pipe/login', '/pipe/register']
	const store = useAppStore()

	router.beforeEach(async (to, form, next) => {
		window.$loading?.start()

		console.log(to)
		next()
		// if (await getToken()) {
		// 	if (whitelist.includes(to.path)) {
		// 		next({ path: '/', replace: true })
		// 		window.$loading?.finish()
		// 	} else {
		// 		next()
		// 	}
		// } else {
		// 	if (whitelist.includes(to.path)) {
		// 		next()
		// 	} else {
		// 		next({ path: '/pipe/login', replace: true })
		// 		window.$loading?.finish()
		// 	}
		// }
	})

	router.afterEach((to, form) => {
		document.title = (to.meta?.title as string) || document.title

		//不是白名单页面路径储存store
		if (!whitelist.includes(to.path) && to.path !== '/refresh') {
			store.setCurrent(to.path)
			store.setMultiple({ key: to.path, meta: to.meta as any })
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
