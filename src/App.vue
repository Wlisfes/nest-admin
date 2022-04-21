<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUStore } from '@/store/modules/u-store'
import { routes } from '@/router'
import { useWatcher } from '@/utils/utils-watcher'

export default defineComponent({
	name: 'App',
	setup() {
		onMounted(() => useWatcher())

		const store = useUStore()
		store.setRouter(routes)

		return () => {
			return (
				<el-config-provider size="default" z-index={3000}>
					<RouterView></RouterView>
				</el-config-provider>
			)
		}
	}
})
</script>
