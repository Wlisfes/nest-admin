<script lang="tsx">
import { defineComponent } from 'vue'
import { Menu } from '@/layout/common'
import { useRoute } from 'vue-router'
import { useUStore } from '@/store/modules/u-store'

export default defineComponent({
	name: 'Aside',
	setup() {
		const route = useRoute()
		const store = useUStore()

		return () => {
			return route.meta?.aside ?? true ? (
				<n-layout-sider
					bordered
					collapsed={store.collapse}
					collapsed-width={store.device === 'MOBILE' ? 0 : 64}
					native-scrollbar={false}
					show-trigger="bar"
					collapse-mode="width"
					expanded-keys={[]}
					onUpdateCollapsed={() => store.setCollapse(!store.collapse)}
				>
					<Menu></Menu>
				</n-layout-sider>
			) : null
		}
	}
})
</script>
