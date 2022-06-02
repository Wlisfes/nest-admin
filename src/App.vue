<script lang="tsx">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/store/modules/app-store'
import { routes } from '@/router'
import { client } from '@/utils/utils-instance'
import { useToRoute } from '@/utils/utils-route'
import { AppProvider } from '@/components/global'

export default defineComponent({
	name: 'App',
	setup() {
		const store = useAppStore()
		store.setRouter(useToRoute(routes))
		store.initBanner()

		onUnmounted(() => client.off())
		onMounted(() => {
			client.listener().then(() => client.on())
		})

		return () => (
			<AppProvider>
				<RouterView></RouterView>
			</AppProvider>
		)
	}
})
</script>
