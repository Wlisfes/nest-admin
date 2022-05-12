import { defineStore } from 'pinia'

export interface UStore {
	theme: 'dark' | 'light'
	inverted: 'dark' | 'light' | 'nav-dark'
	primaryColor: string
	reload: boolean
	breadcr: boolean
	better: boolean
	transition: boolean
	transitionName: string
}

export const useSetStore = defineStore({
	id: 'set-store',
	state: (): UStore => {
		return {
			theme: 'light',
			inverted: 'light',
			primaryColor: '#18a058',
			reload: true,
			breadcr: true,
			better: true,
			transition: false,
			transitionName: 'zoom-fade'
		}
	},
	actions: {
		setTheme(theme: 'dark' | 'light') {
			this.theme = theme
		},
		setInverted(inverted: 'dark' | 'light' | 'nav-dark') {
			this.inverted = inverted
		},
		setPrimaryColor(primaryColor: string) {
			this.primaryColor = primaryColor
		},
		setReload(reload: boolean) {
			this.reload = reload
		},
		setBreadcr(breadcr: boolean) {
			this.breadcr = breadcr
		},
		setBetter(better: boolean) {
			this.better = better
		},
		setTransition(transition: boolean) {
			this.transition = transition
		},
		setTransitionName(transitionName: string) {
			this.transitionName = transitionName
		}
	}
})
