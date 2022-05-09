import { computed } from 'vue'
import { darkTheme, lightTheme, GlobalThemeOverrides } from 'naive-ui'
import { useSetStore } from '@/store/modules/set-store'

export function useProvider() {
	const store = useSetStore()

	const lightThemeOverrides = computed<GlobalThemeOverrides>(() => ({
		common: {
			fontWeightStrong: '500',
			primaryGreyColor: 'rgb(244, 246, 248)',
			primaryColor: store.primaryColor
		}
	}))
	const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
		common: {
			fontWeightStrong: '500',
			primaryGreyColor: 'rgb(16,16,20)',
			primaryColor: store.primaryColor
		}
	}))

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
