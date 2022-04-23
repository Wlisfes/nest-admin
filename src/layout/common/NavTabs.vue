<script lang="tsx">
import { defineComponent, ref, CSSProperties } from 'vue'
import { useUStore } from '@/store/modules/u-store'
import { onEnter } from '@/router'

export default defineComponent({
	name: 'NavTabs',
	setup() {
		const store = useUStore()
		const tabStyle = ref<CSSProperties>({
			border: 'none',
			borderRadius: '2px',
			backgroundColor: '#fff',
			height: '32px'
		})

		return () => (
			<div class="app-nav">
				<n-tabs
					type="card"
					size="small"
					closable
					tabs-padding={15}
					value={store.current}
					tab-style={tabStyle.value}
					onUpdateValue={(path: string) => onEnter(path)}
				>
					{store.multiple.map(item => (
						<n-tab key={item.key} name={item.key}>
							{{ default: () => item.meta.title }}
						</n-tab>
					))}
				</n-tabs>
			</div>
		)
	}
})
</script>

<style lang="scss" scoped>
.app-nav {
	position: relative;
	background-color: #f4f6f8;
	padding: 5px 0;
	:deep(.n-tabs-pad) {
		border-bottom: none !important;
	}
	:deep(.n-tabs-tab) :hover {
		color: var(--n-tab-text-color-active) !important;
	}
	:deep(.n-tabs-tab-pad) {
		width: 5px;
	}
}
</style>
