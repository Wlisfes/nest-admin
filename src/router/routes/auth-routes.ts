import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import type { IPrimary } from '@/api/pipe'
const Layout = () => import('@/layout/Layout.vue')
const Parent = () => import('@/layout/Parent.vue')

export type RouteColumn = RouteRecordRaw & {
    meta: RouteMeta & {
        title?: string
        icon?: string
        route?: boolean
        root?: boolean
        hidden?: boolean
        role?: Array<IPrimary>
    }
}

export const authRoutes: RouteColumn[] = [
    {
        path: '/admin',
        meta: { root: true },
        component: Layout,
        redirect: '/admin/console',
        children: [
            {
                path: '/admin/console',
                name: 'Console',
                meta: { title: '主控台', icon: 'DashboardOutlined', route: true, root: true },
                component: () => import('@/admin/Home.vue')
            }
        ]
    },
    {
        path: '/admin/chive',
        meta: { title: '归档中心', icon: 'RadarChartOutlined' },
        component: Layout,
        children: [
            {
                path: '/admin/chive/record',
                name: 'Record',
                meta: { title: '收录管理', icon: 'TrophyOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            },
            {
                path: '/admin/chive/article',
                name: 'Article',
                meta: { title: '文章管理', icon: 'WalletOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            },
            {
                path: '/admin/chive/article-create',
                name: 'ArticleCreate',
                meta: { title: '新增文章', hidden: true },
                component: () => import('@/admin/Home.vue')
            },
            {
                path: '/admin/chive/article-update',
                name: 'ArticleUpdate',
                meta: { title: '修改文章', hidden: true },
                component: () => import('@/admin/Home.vue')
            },
            {
                path: '/admin/chive/source',
                name: 'ChiveSource',
                meta: { title: '标签管理', icon: 'TagOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            }
        ]
    },
    {
        path: '/admin/cloud',
        meta: { title: '云点播', icon: 'CloudOutlined' },
        component: Layout,
        children: [
            {
                path: '/admin/cloud/media',
                name: 'Media',
                meta: { title: '媒体管理', icon: 'VideoCameraOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            },
            {
                path: '/admin/cloud/source',
                name: 'CloudSource',
                meta: { title: '媒体分类', icon: 'InstagramOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            }
        ]
    },
    {
        path: '/admin/source',
        meta: { title: '资源管理', icon: 'PicCenterOutlined' },
        component: Layout,
        children: [
            {
                path: '/admin/source/poster',
                name: 'Poster',
                meta: { title: '图床管理', icon: 'FileImageOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            }
        ]
    },
    {
        path: '/admin/system',
        meta: { title: '系统管理', icon: 'SettingOutlined', role: ['admin', 'dev'] },
        component: Layout,
        children: [
            {
                path: '/admin/system/permission',
                name: 'Permission',
                meta: { title: '权限守卫', icon: 'SecurityScanOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            },
            {
                path: '/admin/system/middle',
                name: 'Middle',
                meta: { title: '权限键', icon: 'KeyOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            },
            {
                path: '/admin/system/role',
                name: 'Role',
                meta: { title: '系统角色', icon: 'ApartmentOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            },
            {
                path: '/admin/system/user',
                name: 'User',
                meta: { title: '用户管理', icon: 'UserOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            },
            {
                path: '/admin/system/chunk',
                name: 'Chunk',
                meta: { title: '版本资源', icon: 'CloudUploadOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            },
            {
                path: '/admin/system/logger',
                name: 'Logger',
                meta: { title: '接口日志', icon: 'CarryOutOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            },
            {
                path: '/admin/system/update',
                name: 'Update',
                meta: { title: '更新日志', icon: 'ScheduleOutlined', route: true },
                component: () => import('@/admin/Home.vue')
            }
        ]
    }
]