import { RouteRecordRaw } from 'vue-router'
import { Compute, Login, Register } from '@/views/pipe'

/**
 * @param String meta.title     标题
 * @param String meta.icon      图标
 * @param Boolean meta.hidden   是否显示菜单
 * @param Boolean meta.root     是否为顶层菜单
 */
export const baseRoutes: RouteRecordRaw[] = [
	{
		path: '/pipe',
		name: 'Compute',
		meta: { hidden: true },
		component: Compute,
		redirect: '/pipe/login',
		children: [
			{
				path: '/pipe/login',
				name: 'Login',
				meta: { title: '登录' },
				components: { default: Login, login: Login }
			},
			{
				path: '/pipe/register',
				name: 'Register',
				meta: { title: '注册' },
				components: { default: Register, register: Register }
			}
		]
	}
]
