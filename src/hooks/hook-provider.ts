import { computed } from 'vue'
import { darkTheme, lightTheme, GlobalThemeOverrides } from 'naive-ui'
import { useSetStore } from '@/store/modules/set-store'

export function useTheme() {
	const store = useSetStore()

	const lightThemeOverrides = computed<GlobalThemeOverrides>(() => ({
		common: {
			fontWeightStrong: '500',
			primaryBackColor: 'rgb(244, 246, 248)',
			primaryColor: store.primaryColor
		}
	}))
	const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
		common: {
			fontWeightStrong: '500',
			primaryBackColor: 'rgb(24, 24, 28)',
			primaryColor: store.primaryColor
		}
	}))

	setTimeout(() => {
		store.setTheme('dark')
		console.log(store.theme)
	}, 3000)

	const theme = computed(() => {
		switch (store.theme) {
			case 'light':
				return lightTheme
			case 'dark':
				return darkTheme
			default:
				return lightTheme
		}
	})

	const themeOverrides = computed(() => {
		switch (store.theme) {
			case 'light':
				return lightThemeOverrides.value
			case 'dark':
				return darkThemeOverrides.value
			default:
				return lightThemeOverrides.value
		}
	})

	return { theme, themeOverrides }
}