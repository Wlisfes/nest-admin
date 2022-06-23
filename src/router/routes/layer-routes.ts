import { RouteRecordRaw } from 'vue-router'
import { Compute, Login, Register } from '@/client/pipe'
import { Layer } from '@/layout'

export const layerRoutes: RouteRecordRaw[] = [
    {
        path: '/compute',
        name: 'Compute',
        component: Compute,
        children: [
            {
                path: '/login',
                name: 'Login',
                meta: { title: '登录' },
                components: { default: Login, login: Login }
            },
            {
                path: '/register',
                name: 'Register',
                meta: { title: '注册' },
                components: { default: Register, register: Register }
            }
        ]
    },
    {
        path: '/',
        component: Layer,
        children: [
            {
                path: '/',
                name: 'Index',
                meta: { title: '🍎 首页' },
                component: () => import('@/client/Index.vue')
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
