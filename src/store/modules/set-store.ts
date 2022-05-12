import { defineStore } from 'pinia'

export interface UStore {
	theme: 'dark' | 'light'
	primaryColor: string
}

export const useSetStore = defineStore({
	id: 'set-store',
	state: (): UStore => {
		return {
			theme: 'dark',
			primaryColor: '#1b73fa'
		}
	},
	actions: {
		setTheme(theme: 'dark' | 'light') {
			this.theme = theme
		},
		setPrimaryColor(primaryColor: string) {
			this.primaryColor = primaryColor
		}
	}
})
