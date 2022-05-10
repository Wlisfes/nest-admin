import { computed, ComputedRef } from 'vue'
import { useThemeVars, darkTheme, lightTheme, GlobalThemeOverrides, ThemeCommonVars } from 'naive-ui'
import { useSetStore } from '@/store/modules/set-store'

type CustomizeVars = {
	backColor: string
}
export type ThemeVars = ComputedRef<ThemeCommonVars & CustomizeVars>

export function useProvider() {
	const store = useSetStore()
	const vars = useThemeVars() as ThemeVars
	const lightThemeOverrides = computed<GlobalThemeOverrides>(() => ({
		common: {
			fontWeightStrong: '500',
			backColor: 'rgb(244, 246, 248)',
			primaryColor: store.primaryColor
		}
	}))
	const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
		common: {
			fontWeightStrong: '500',
			backColor: 'rgb(16,16,20)',
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

	return { theme, themeOverrides, vars }
}
