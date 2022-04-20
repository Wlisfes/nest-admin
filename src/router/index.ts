import type { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authRoutes } from '@/router/auth-routes'

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

//挂载路由
export function setupRouter(app: App<Element>) {
	app.use(router)
}

export default router
