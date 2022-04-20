<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useUStore } from '@/store/modules/u-store'
import { routes } from '@/router'

export default defineComponent({
	name: 'App',
	setup() {
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
