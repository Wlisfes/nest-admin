<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUStore } from '@/store/modules/u-store'
import { routes } from '@/router'
import { useWatcher } from '@/utils/utils-watcher'
import { useToRoute } from '@/utils/utils-route'

export default defineComponent({
	name: 'App',
	setup() {
		onMounted(() => useWatcher())

		const store = useUStore()
		store.setRouter(useToRoute(routes))

		return () => (
			<n-config-provider abstract>
				<RouterView></RouterView>
			</n-config-provider>
		)
	}
})
</script>
