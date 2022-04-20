import { defineStore } from 'pinia'

export const useUStore = defineStore({
	id: 'u-store',
	state: () => {
		return { device: 'PC', width: 0, current: '/home', collapse: false, router: [], multiple: [] }
	},
	actions: {
		setDevice(device: string): void {
			this.device = device
		},
		setWidth(width: number) {
			this.width = width
		},
		setCurrent(current: string) {
			this.current = current
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
