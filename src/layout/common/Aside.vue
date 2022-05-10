<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { Menu } from '@/layout/common'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/modules/app-store'

export default defineComponent({
	name: 'Aside',
	setup() {
		const route = useRoute()
		const app = useAppStore()
		const mobile = computed(() => app.device === 'MOBILE')

		return () => {
			return route.meta?.aside ?? true ? (
				<n-layout-sider
					bordered
					collapsed={app.collapse}
					width={220}
					collapsed-width={mobile.value ? 0 : 64}
					native-scrollbar={false}
					show-trigger={mobile.value ? false : 'bar'}
					collapse-mode="width"
					expanded-keys={[]}
					onUpdateCollapsed={() => app.setCollapse(!app.collapse)}
				>
					<Menu></Menu>
				</n-layout-sider>
			) : null
		}
	}
})
</script>
