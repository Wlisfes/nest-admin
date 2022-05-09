<script lang="tsx">
import { defineComponent, computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { darkTheme, lightTheme, useOsTheme, GlobalThemeOverrides } from 'naive-ui'
import { useAppStore } from '@/store/modules/app-store'
import { routes } from '@/router'
import { useWatcher } from '@/utils/utils-watcher'
import { useToRoute } from '@/utils/utils-route'
import { AppProvider } from '@/components/global'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
	name: 'App',
	setup() {
		const store = useAppStore()
		const { theme } = useProvider()
		store.setRouter(useToRoute(routes))

		const themeOverrides: GlobalThemeOverrides = {
			common: {
				// bodyColor1: 'red',
				fontWeightStrong: '500',
				primaryColor: 'red'
			}
		}

		onMounted(() => useWatcher())

		return () => (
			<n-config-provider abstract theme={theme.value} theme-overrides={themeOverrides}>
				<AppProvider>
					<RouterView></RouterView>
				</AppProvider>
			</n-config-provider>
		)
	}
})
</script>
