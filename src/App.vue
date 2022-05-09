<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/store/modules/app-store'
import { routes } from '@/router'
import { useWatcher } from '@/utils/utils-watcher'
import { useToRoute } from '@/utils/utils-route'
import { AppProvider } from '@/components/global'
import { useTheme } from '@/hooks/hook-provider'

export default defineComponent({
	name: 'App',
	setup() {
		const store = useAppStore()
		const { theme, themeOverrides } = useTheme()
		store.setRouter(useToRoute(routes))

		onMounted(() => useWatcher())

		return () => (
			<n-config-provider abstract theme={theme.value} theme-overrides={themeOverrides.value}>
				<AppProvider>
					<RouterView></RouterView>
				</AppProvider>
			</n-config-provider>
		)
	}
})
</script>
