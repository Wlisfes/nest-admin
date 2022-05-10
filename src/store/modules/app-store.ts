import { defineStore } from 'pinia'
import { bfs } from '@/utils/utils-route'
import { MenuOption } from 'naive-ui'

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
			multiple: []
		}
	},
	actions: {
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
		}
	}
})
