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
                meta: { title: '็ปๅฝ' },
                components: { default: Login, login: Login }
            },
            {
                path: '/register',
                name: 'Register',
                meta: { title: 'ๆณจๅ' },
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
                meta: { title: '๐ ้ฆ้กต' },
                component: () => import('@/client/Index.vue')
            },
            {
                path: '/multiple',
                name: 'Multiple',
                meta: { title: '๐ ๅฝๆกฃ' },
                component: () => import('@/client/Multiple.vue')
            },
            {
                path: '/client',
                name: 'Client',
                meta: { title: '๐ ่ง้ข' },
                component: () => import('@/client/Client.vue')
            },
            {
                path: '/minute',
                name: 'Minute',
                meta: { title: '๐ ๆถๅฝ' },
                component: () => import('@/client/Minute.vue')
            },
            {
                path: '/partner',
                name: 'Partner',
                meta: { title: '๐ ็ๆดป' },
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
