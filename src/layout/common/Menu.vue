<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { onEnter } from '@/router'
import { useUStore } from '@/store/modules/u-store'

export default defineComponent({
	name: 'Menu',
	setup() {
		const store = useUStore()
		const logo = computed(() => {
			if (store.collapse) return new URL('/src/assets/resource/mini-logo.png', import.meta.url).href
			return new URL('/src/assets/resource/large-logo.png', import.meta.url).href
		})
		const onSelecter = (path: string, u: any) => onEnter(path)

		return () => (
			<n-menu
				accordion
				root-indent={18}
				value={store.current}
				expanded-keys={store.expanded}
				collapsed={store.collapse}
				collapsed-width={64}
				options={store.router}
				onUpdateValue={onSelecter}
				onUpdateExpanded-keys={(keys: string[]) => store.setExpanded(keys)}
			/>
		)
	}
})
</script>

<style lang="scss" scoped>
.app-menu {
	flex: 1;
	height: 100%;
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	border-right: 1px solid #f1f1f182;
	&-wrapper {
		flex: 1;
		overflow-x: hidden;
		// :deep(.el-scrollbar__view) {
		// 	flex: 1;
		// 	display: flex;
		// 	flex-direction: column;
		// 	overflow: hidden;
		// }
		// :deep(.el-scrollbar__wrap) {
		// 	.el-scrollbar__wrap {
		// 		overflow-x: hidden;
		// 		margin-bottom: 0 !important;
		// 	}
		// }
	}
	&-logo {
		position: relative;
		height: 60px;
		line-height: 60px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	:deep(.el-menu) {
		border-right: none;
	}
	:deep(.el-submenu) {
		margin-top: 6px;
	}
	:deep(.el-submenu__title, .el-menu-item) {
		height: 42px;
		line-height: 42px;
		position: relative;
		&.is-active {
			background-color: #ecf5ff;
		}
	}
}
</style>
