import type { RouteRecordRaw } from 'vue-router'
import { authRoutes } from './auth-routes'
import { layerRoutes } from './layer-routes'
import { Refresh } from '@/layout'

export const routes: RouteRecordRaw[] = [
    ...layerRoutes,
    ...authRoutes,
    {
        path: '/refresh/',
        name: 'Refresh',
        component: Refresh
    }
]
