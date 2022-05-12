import { defineStore } from 'pinia'

export interface UStore {
	theme: 'dark' | 'light'
	inverted: 'dark' | 'light' | 'nav-dark'
	primaryColor: string
}

export const useSetStore = defineStore({
	id: 'set-store',
	state: (): UStore => {
		return {
			theme: 'light',
			inverted: 'light',
			primaryColor: '#1b73fa'
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
		}
	}
})
