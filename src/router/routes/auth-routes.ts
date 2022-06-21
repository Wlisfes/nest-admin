import type { RouteRecordRaw } from 'vue-router'
import { Layout, Parent, Refresh } from '@/layout'

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/admin',
        component: Layout,
        redirect: '/admin/console',
        children: [
            {
                path: '/admin/console',
                name: 'Console',
                meta: { title: '控制台' },
                component: () => import('@/admin/Console.vue')
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
