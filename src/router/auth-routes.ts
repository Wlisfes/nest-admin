import { RouteRecordRaw } from 'vue-router'
import { Layout, Parent, Refresh } from '@/layout'

/**
 * @param String meta.title     标题
 * @param String meta.icon      图标
 * @param String meta.auth      是否需要登录
 * @param Boolean meta.hidden   是否显示菜单
 * @param Boolean meta.root     是否为顶层菜单
 */
export const authRoutes: RouteRecordRaw[] = [
	{
		path: '/admin',
		meta: { title: '控制台', icon: 'antd-dashboard', auth: true },
		component: Layout,
		redirect: '/admin',
		children: [
			{
				path: '/admin',
				name: 'Home',
				meta: { title: '主控台', auth: true },
				component: () => import('@/views/home/Home.vue')
			},
			{
				path: '/monitor',
				name: 'Monitor',
				meta: { title: '监控页', auth: true },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/work/bench',
				name: 'WorkBench',
				meta: { title: '工作台', auth: true },
				component: () => import('@/views/home/Template.vue')
			}
		]
	},
	{
		path: '/system',
		meta: { title: '系统管理', icon: 'antd-setting' },
		component: Layout,
		redirect: '/system/user',
		children: [
			{
				path: '/system/user',
				name: 'SystemUser',
				meta: { title: '用户管理' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/system/menu',
				name: 'SystemMenu',
				meta: { title: '菜单管理' },
				component: Parent,
				redirect: '/system/menu/1',
				children: [
					{
						path: '/system/menu/1',
						name: 'SystemMenu1',
						meta: { title: '菜单1' },
						component: () => import('@/views/home/Template.vue')
					},
					{
						path: '/system/menu/2',
						name: 'SystemMenu2',
						meta: { title: '菜单2' },
						component: () => import('@/views/home/Template.vue')
					}
				]
			},
			{
				path: '/system/role',
				name: 'SystemRole',
				meta: { title: '角色管理' },
				component: () => import('@/views/home/Template.vue')
			}
		]
	},
	{
		path: '/exception',
		meta: { title: '异常页面', icon: 'antd-error' },
		component: Layout,
		redirect: '/exception/401',
		children: [
			{
				path: '/exception/401',
				name: 'Exception401',
				meta: { title: '401' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/exception/403',
				name: 'Exception403',
				meta: { title: '403' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/exception/404',
				name: 'Exception404',
				meta: { title: '404' },
				component: () => import('@/views/home/Template.vue')
			}
		]
	},
	{
		path: '/about',
		meta: { root: true },
		component: Layout,
		redirect: '/about/root',
		children: [
			{
				path: '/about/root',
				name: 'AboutRoot',
				meta: { title: '关于', icon: 'antd-desktop' },
				component: () => import('@/views/home/Template.vue')
			}
		]
	},
	{
		path: '/refresh/',
		name: 'Refresh',
		meta: { hidden: true },
		component: Refresh
	}
]
