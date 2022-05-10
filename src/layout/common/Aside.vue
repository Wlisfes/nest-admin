<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { onEnter } from '@/router'
import { useAppStore } from '@/store/modules/app-store'

export default defineComponent({
	name: 'Aside',
	setup() {
		const route = useRoute()
		const app = useAppStore()
		const mobile = computed(() => app.device === 'MOBILE')

		const logo = computed(() => {
			if (app.collapse) return new URL('/src/assets/resource/mini-logo.png', import.meta.url).href
			return new URL('/src/assets/resource/large-logo.png', import.meta.url).href
		})

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
					<n-menu
						accordion
						root-indent={18}
						value={app.current}
						expanded-keys={app.expanded}
						collapsed={app.collapse}
						collapsed-width={64}
						options={app.router}
						onUpdateValue={(path: string) => onEnter(path)}
						onUpdateExpanded-keys={(keys: string[]) => app.setExpanded(keys)}
					/>
				</n-layout-sider>
			) : null
		}
	}
})
</script>
