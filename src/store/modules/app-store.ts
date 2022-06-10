import type { MenuOption } from 'naive-ui'
import type { IBanner } from '@/api/pipe'
import { defineStore } from 'pinia'
import { httpWallpaper, httpRoute } from '@/api/service'
import { bfs, useToRoute } from '@/utils/utils-route'
import { loadCover } from '@/utils/utils-tool'

export interface OneMultiple {
    key: string
    meta: { icon: string; title: string }
}

export interface AppStore {
    device: string
    width: number
    current: string
    expanded: Array<string>
    collapse: boolean
    router: Array<MenuOption>
    multiple: Array<OneMultiple>
    banner: Array<IBanner>
    index: number
}

export const useAppStore = defineStore({
    id: 'app-store',
    state: (): AppStore => {
        return {
            device: 'PC',
            width: 0,
            current: '/home',
            expanded: ['/'],
            collapse: false,
            router: [],
            multiple: [],
            banner: [],
            index: 0
        }
    },
    actions: {
        /**角色路由菜单**/
        async httpRoute() {
            try {
                const { data } = await httpRoute()
                const router = useToRoute(data || [])
                console.log(router)
                this.setRouter(router)
            } catch (e) {
                return Promise.reject(e)
            }
        },
        setDevice(device: string): void {
            this.device = device
        },
        setWidth(width: number) {
            this.width = width
            return width
        },
        setCurrent(current: string) {
            const node = bfs(this.router as Array<MenuOption>, current)
            if (node) {
                const current = (node.current as string) || ''
                const keys = current.split('*')
                keys.length > 0 && keys.pop()
                this.expanded = keys
            }
            this.current = current
        },
        setExpanded(expanded: string[]) {
            this.expanded = expanded
        },
        setCollapse(collapse: boolean) {
            this.collapse = collapse
        },
        setRouter(router: any) {
            this.router = router
        },
        setMultiple(route: OneMultiple) {
            //插入一条历史路径、需要判断重复路径
            if (!this.multiple.some(item => item.key === route?.key)) {
                this.multiple.push(route)
            }
        },
        closeRoute(type: 'close-current' | 'close-other' | 'close-all', path?: string) {
            return new Promise(resolve => {
                if (type === 'close-current' && path) {
                    //关闭一条历史路径
                    const index = this.multiple.findIndex(item => item.key === path)
                    this.multiple.splice(index >>> 0, 1)
                } else if (type === 'close-other') {
                    //关闭其他历史路径
                    this.multiple = this.multiple.filter(item => item.key === this.current)
                } else if (type === 'close-all') {
                    //关闭全部历史路径
                    this.multiple = []
                }
                resolve(type)
            })
        },
        initBanner() {
            return httpWallpaper().then(async ({ data }) => {
                if (data?.length > 0) {
                    await loadCover(data[0].cover)
                    this.banner = data
                    return data
                }
            })
        },
        prevBanner() {
            return new Promise<void>(async resolve => {
                window.$loading?.start()
                const { banner, index } = this
                if (index > 0) {
                    const cover = banner[index - 1]?.cover
                    await loadCover(cover)
                    this.index--
                } else {
                    const cover = banner[banner.length - 1]?.cover
                    await loadCover(cover)
                    this.index = banner.length - 1
                }
                resolve(window.$loading?.finish())
            })
        },
        nextBanner() {
            return new Promise<void>(async resolve => {
                window.$loading?.start()
                const { banner, index } = this
                if (index < banner.length - 1) {
                    const cover = banner[index + 1]?.cover
                    await loadCover(cover)
                    this.index++
                } else {
                    const cover = banner[0]?.cover
                    await loadCover(cover)
                    this.index = 0
                }
                resolve(window.$loading?.finish())
            })
        }
    }
})
