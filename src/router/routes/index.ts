import type { RouteRecordRaw } from 'vue-router'
import { authRoutes } from './auth-routes'
import { layerRoutes } from './layer-routes'

export const routes: RouteRecordRaw[] = [...layerRoutes, ...authRoutes]
