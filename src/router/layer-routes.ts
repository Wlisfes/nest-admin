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
				meta: { title: '🍀 归档' },
				component: () => import('@/client/Multiple.vue')
			},
			{
				path: '/client',
				name: 'Client',
				meta: { title: '🍓 视频' },
				component: () => import('@/client/Client.vue')
			},
			{
				path: '/minute',
				name: 'Minute',
				meta: { title: '🍒 收录' },
				component: () => import('@/client/Minute.vue')
			},
			{
				path: '/partner',
				name: 'Partner',
				meta: { title: '🍄 生活' },
				component: () => import('@/client/Partner.vue')
			}
		]
	}
]
