import { defineStore } from 'pinia'
import { bfs } from '@/utils/utils-route'
import { MenuOption } from 'naive-ui'

export interface AppStore {
	device: string
	width: number
	current: string
	expanded: Array<string>
	collapse: boolean
	router: Array<MenuOption>
	multiple: Array<{ key: string; meta: { icon: string; title: string } }>
	theme: 'dark' | 'light'
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
			theme: 'light'
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
		setMultiple({ type = 1, props }: { type: number; props: any }) {
			if (type === 1) {
				//插入一条历史路径、需要判断重复路径
				if (!this.multiple.some((item: any) => item.key === props.key)) {
					this.multiple.push(props)
				}
			} else if (type === 2) {
				//删除一条历史路径
				const index = this.multiple.findIndex(item => item.key === props.path)
				this.multiple.splice(index >>> 0, 1)
			} else if (type === 3) {
				//关闭一组历史路径
				this.multiple = this.multiple.filter(item => {
					return !props.group.some((k: any) => k.key === item.key)
				})
			} else if (type === 4) {
				//清空历史路径
				this.multiple = []
			}
		},
		setTheme(theme: 'dark' | 'light') {
			this.theme = theme
		}
	}
})
