import type { RouteRecordRaw, RouteMeta } from 'vue-router'
const Layout = () => import('@/layout/Layout.vue')
const Parent = () => import('@/layout/Parent.vue')

export type RouteColumn = RouteRecordRaw & {
    meta: RouteMeta & {
        title?: string
        icon?: string
        route?: boolean
        root?: boolean
        hidden?: boolean
        login?: boolean
        role?: Array<IPrimary>
    }
}

export const authRoutes: RouteColumn[] = [
    {
        path: '/admin',
        meta: { root: true, login: true },
        component: Layout,
        redirect: '/admin/home',
        children: [
            {
                path: '/admin/home',
                name: 'Home',
                meta: { title: '主控台', icon: 'DashboardOutlined', route: true, root: true, login: true },
                component: () => import('@/admin/basic/Home.vue')
            }
        ]
    },
    {
        path: '/admin/manager',
        meta: { title: '归档中心', icon: 'RadarChartOutlined', login: true },
        component: Layout,
        redirect: '/admin/manager/record',
        children: [
            {
                path: '/admin/manager/article',
                name: 'Article',
                meta: { title: '文章管理', icon: 'WalletOutlined', route: true, login: true },
                component: () => import('@/admin/manager/Article.vue')
            },
            {
                path: '/admin/manager/record',
                name: 'Record',
                meta: { title: '收录管理', icon: 'TrophyOutlined', route: true, login: true },
                component: () => import('@/admin/manager/Record.vue')
            },
            {
                path: '/admin/manager/source',
                name: 'ChiveSource',
                meta: { title: '标签管理', icon: 'TagOutlined', route: true, login: true },
                component: () => import('@/admin/manager/Source.vue')
            }
        ]
    },
    {
        path: '/admin/cloud',
        meta: { title: '云点播', icon: 'CloudOutlined', login: true },
        component: Layout,
        redirect: '/admin/cloud/dinner',
        children: [
            {
                path: '/admin/cloud/dinner',
                name: 'Dinner',
                meta: { title: '番剧管理', icon: 'PlaySquareOutlined', route: true, login: true },
                component: () => import('@/admin/cloud/Dinner.vue')
            },
            {
                path: '/admin/cloud/media',
                name: 'Media',
                meta: { title: '短片管理', icon: 'VideoCameraOutlined', route: true, login: true },
                component: () => import('@/admin/cloud/Media.vue')
            },
            {
                path: '/admin/cloud/source',
                name: 'CloudSource',
                meta: { title: '点播分类', icon: 'InstagramOutlined', route: true, login: true },
                component: () => import('@/admin/cloud/Source.vue')
            }
        ]
    },
    {
        path: '/admin/resource',
        meta: { title: '资源库', icon: 'PicCenterOutlined', login: true },
        component: Layout,
        redirect: '/admin/resource/poster',
        children: [
            {
                path: '/admin/resource/poster',
                name: 'Poster',
                meta: { title: '图床管理', icon: 'FileImageOutlined', route: true, login: true },
                component: () => import('@/admin/resource/Poster.vue')
            },
            {
                path: '/admin/resource/chunk',
                name: 'Chunk',
                meta: { title: '版本资源管理', icon: 'CloudUploadOutlined', route: true, login: true },
                component: () => import('@/admin/resource/Chunk.vue')
            }
        ]
    },
    {
        path: '/admin/system',
        meta: { title: '系统管理', icon: 'SettingOutlined', login: true, role: ['admin', 'dev'] },
        component: Layout,
        redirect: '/admin/system/user',
        children: [
            {
                path: '/admin/system/guard',
                name: 'Guard',
                meta: { title: '权限守卫', icon: 'SecurityScanOutlined', route: true, login: true },
                component: () => import('@/admin/system/Guard.vue')
            },
            {
                path: '/admin/system/power',
                name: 'Power',
                meta: { title: '权限键', icon: 'KeyOutlined', route: true, login: true },
                component: () => import('@/admin/system/Power.vue')
            },
            {
                path: '/admin/system/role',
                name: 'Role',
                meta: { title: '系统角色', icon: 'ApartmentOutlined', route: true, login: true },
                component: () => import('@/admin/system/Role.vue')
            },
            {
                path: '/admin/system/user',
                name: 'User',
                meta: { title: '用户管理', icon: 'UserOutlined', route: true, login: true },
                component: () => import('@/admin/system/User.vue')
            },
            {
                path: '/admin/system/logger',
                name: 'Logger',
                meta: { title: '接口日志', icon: 'CarryOutOutlined', route: true, login: true },
                component: () => import('@/admin/system/Logger.vue')
            },
            {
                path: '/admin/system/update',
                name: 'Update',
                meta: { title: '更新日志', icon: 'ScheduleOutlined', route: true, login: true },
                component: () => import('@/admin/Home.vue')
            }
        ]
    }
]
