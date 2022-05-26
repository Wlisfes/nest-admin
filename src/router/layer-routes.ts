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
		meta: { title: '妖雨录' },
		component: Layer,
		children: [
			{
				path: '/',
				name: 'Home',
				meta: { title: '妖雨录' },
				component: () => import('@/views/home/Home.vue')
			}
		]
	}
]
