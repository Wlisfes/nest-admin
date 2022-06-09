import { computed, ComputedRef, ref } from 'vue'
import { useThemeVars, darkTheme, lightTheme, GlobalThemeOverrides, ThemeCommonVars } from 'naive-ui'
import { useDvcStore } from '@/store/modules/dvc-store'

type CustomizeVars = {
	backColor: string
	backMarkColor: string
	backCodeColor: string
}
export type ThemeVars = ComputedRef<ThemeCommonVars & CustomizeVars>

export function useProvider() {
	const dvc = useDvcStore()
	const vars = useThemeVars() as ThemeVars
	const lightThemeOverrides = computed<GlobalThemeOverrides>(() => ({
		common: {
			fontWeightStrong: '500',
			backColor: 'rgb(244, 246, 248)',
			primaryColor: dvc.primaryColor,
			backMarkColor: 'rgb(235, 235, 235)',
			backCodeColor: 'rgb(40, 44, 52)'
		}
	}))
	const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
		common: {
			fontWeightStrong: '500',
			backColor: 'rgb(16,16,20)',
			primaryColor: dvc.primaryColor,
			primaryColorSuppl: dvc.primaryColor,
			backMarkColor: 'rgb(44, 44, 50)',
			backCodeColor: 'rgb(6, 6, 10)'
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
		if (dvc.theme === 'dark' || dvc.inverted === 'nav-dark') {
			return { aside: true, header: true }
		} else if (dvc.inverted === 'dark') {
			return { aside: true, header: false }
		} else {
			return { aside: false, header: false }
		}
	})

	const theme = computed(() => {
		switch (dvc.theme) {
			case 'light':
				return lightTheme
			case 'dark':
				return darkTheme
			default:
				return lightTheme
		}
	})

	const themeOverrides = computed(() => {
		switch (dvc.theme) {
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
