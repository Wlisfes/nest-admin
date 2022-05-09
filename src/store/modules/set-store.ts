import { defineStore } from 'pinia'

export interface UStore {
	theme: 'dark' | 'light'
	primaryColor: string
}

export const useSetStore = defineStore({
	id: 'set-store',
	state: (): UStore => {
		return {
			theme: 'light',
			primaryColor: '#18a058'
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
