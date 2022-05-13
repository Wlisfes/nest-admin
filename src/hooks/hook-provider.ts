import { computed, ComputedRef, ref } from 'vue'
import { useThemeVars, darkTheme, lightTheme, GlobalThemeOverrides, ThemeCommonVars } from 'naive-ui'
import { useSetStore } from '@/store/modules/dvc-store'

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
	const primaryVars = ref<Array<string>>([
		'#1b73fa',
		'#0960bd',
		'#0084f4',
		'#009688',
		'#536dfe',
		'#ff5c93',
		'#ee4f12',
		'#0096c7',
		'#9c27b0',
		'#ff9800',
		'#FF3D68',
		'#00C1D4',
		'#18a058',
		'#52c41a',
		'#78DEC7',
		'#1768AC',
		'#FB9300',
		'#FC5404'
	])
	const animate = ref([
		{ value: 'zoom-fade', label: '渐变' },
		{ value: 'zoom-out', label: '闪现' },
		{ value: 'fade-slide', label: '滑动' },
		{ value: 'fade', label: '消退' },
		{ value: 'fade-bottom', label: '底部消退' },
		{ value: 'fade-scale', label: '缩放消退' }
	])

	const inverted = computed(() => {
		if (store.theme === 'dark' || store.inverted === 'nav-dark') {
			return { aside: true, header: true }
		} else if (store.inverted === 'dark') {
			return { aside: true, header: false }
		} else {
			return { aside: false, header: false }
		}
	})

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

	return { theme, themeOverrides, vars, primaryVars, inverted, animate }
}
