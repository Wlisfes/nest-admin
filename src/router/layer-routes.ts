import { RouteRecordRaw } from 'vue-router'
import { Layer } from '@/layout'

/**
 * @param String meta.title     标题
 * @param String meta.icon      图标
 * @param Boolean meta.hidden   是否显示菜单
 * @param Boolean meta.root     是否为顶层菜单
 */
export const layerRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Layer,
		meta: { hidden: true },
		children: [
			{
				path: '/',
				name: 'Home',
				meta: { title: '🍎 首页' },
				component: () => import('@/client/Home.vue')
			},
			{
				path: '/multiple',
				name: 'Multiple',
				meta: { title: '🍀 归档', keepAlive: true },
				component: () => import('@/client/Multiple.vue')
			},
			{
				path: '/client',
				name: 'Client',
				meta: { title: '🍓 视频', keepAlive: true },
				component: () => import('@/client/Client.vue')
			},
			{
				path: '/minute',
				name: 'Minute',
				meta: { title: '🍒 收录', keepAlive: true },
				component: () => import('@/client/Minute.vue')
			},
			{
				path: '/partner',
				name: 'Partner',
				meta: { title: '🍄 生活', keepAlive: true },
				component: () => import('@/client/Partner.vue')
			},
			{
				path: '/player/:id',
				name: 'Player',
				component: () => import('@/client/bower/Player.vue')
			},
			{
				path: '/check/:id',
				name: 'Check',
				component: () => import('@/client/bower/Check.vue')
			}
		]
	}
]
