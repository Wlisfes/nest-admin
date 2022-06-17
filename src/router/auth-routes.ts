import type { RouteRecordRaw } from 'vue-router'
import { Layout, Parent, Refresh } from '@/layout'

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        meta: { title: '控制台' },
        component: Layout,
        children: [
            {
                path: '/admin/home',
                name: 'Home',
                meta: { title: '首页' },
                component: () => import('@/admin/Home.vue')
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
