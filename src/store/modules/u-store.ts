import { defineStore } from 'pinia'
import { bfs } from '@/utils/utils-route'

export const useUStore = defineStore({
	id: 'u-store',
	state: () => {
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
			const node = bfs(this.router, current)
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
		setMultiple({ type = 1, props }: { type: number; props: any }) {}
	}
})
