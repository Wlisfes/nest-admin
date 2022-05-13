<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/store/modules/app-store'
import { routes } from '@/router'
import { useWatcher } from '@/utils/utils-watcher'
import { useToRoute } from '@/utils/utils-route'
import { AppProvider } from '@/components/global'

export default defineComponent({
	name: 'App',
	setup() {
		const store = useAppStore()
		store.setRouter(useToRoute(routes))
		onMounted(() => useWatcher())

		return () => (
			<AppProvider>
				<RouterView></RouterView>
			</AppProvider>
		)
	}
})
</script>
