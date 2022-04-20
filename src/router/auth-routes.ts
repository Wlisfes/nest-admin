import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/layout'

/**
 * @param String meta.title     标题
 * @param String meta.icon      图标
 * @param Boolean meta.hidden   是否显示菜单
 * @param Boolean meta.root     是否为顶层菜单
 */
export const authRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		meta: { title: '控制台', icon: 'el-icon-odometer' },
		component: Layout
	}
]
