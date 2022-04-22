import { RouteRecordRaw } from 'vue-router'
import { Layout, Parent, Refresh } from '@/layout'

/**
 * @param String meta.title     标题
 * @param String meta.icon      图标
 * @param Boolean meta.hidden   是否显示菜单
 * @param Boolean meta.root     是否为顶层菜单
 */
export const authRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		meta: { title: '控制台', icon: 'antd-dashboard' },
		component: Layout,
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'Home',
				meta: { title: '主控台' },
				component: () => import('@/views/home/Home.vue')
			},
			{
				path: '/monitor',
				name: 'Monitor',
				meta: { title: '监控页' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/work/bench',
				name: 'WorkBench',
				meta: { title: '工作台' },
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
		path: '/http',
		meta: { title: '异常页面', icon: 'antd-bug' },
		component: Layout,
		redirect: '/http/401',
		children: [
			{
				path: '/http/401',
				name: 'http401',
				meta: { title: '401' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/403',
				name: 'http403',
				meta: { title: '403' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/404',
				name: 'http404',
				meta: { title: '404' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/405',
				name: 'http405',
				meta: { title: '405' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/406',
				name: 'http406',
				meta: { title: '406' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/407',
				name: 'http407',
				meta: { title: '407' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/408',
				name: 'http408',
				meta: { title: '408' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/409',
				name: 'http409',
				meta: { title: '409' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/410',
				name: 'http410',
				meta: { title: '410' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/411',
				name: 'http411',
				meta: { title: '411' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/412',
				name: 'http412',
				meta: { title: '412' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/413',
				name: 'http413',
				meta: { title: '413' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/414',
				name: 'http414',
				meta: { title: '414' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/415',
				name: 'http415',
				meta: { title: '415' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/416',
				name: 'http416',
				meta: { title: '416' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/417',
				name: 'http417',
				meta: { title: '417' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/417',
				name: 'http417',
				meta: { title: '417' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/418',
				name: 'http418',
				meta: { title: '418' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/419',
				name: 'http419',
				meta: { title: '419' },
				component: () => import('@/views/home/Template.vue')
			},
			{
				path: '/http/420',
				name: 'http420',
				meta: { title: '420' },
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
