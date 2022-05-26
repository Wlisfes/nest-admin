<script lang="tsx">
import { defineComponent, computed, VNode, createVNode, CSSProperties } from 'vue'
import { RouterView, RouteLocationNormalizedLoaded } from 'vue-router'
import { MaskCover } from '@/layout/common'

export default defineComponent({
	name: 'Layer',
	setup() {
		const layer = computed<CSSProperties>(() => ({
			top: '60px'
		}))

		return () => (
			<n-layout id="app-layer">
				<MaskCover></MaskCover>
				<n-layout-header style={{ height: '50px' }}>header</n-layout-header>
				<n-layout style={layer.value} position="absolute" native-scrollbar={false}>
					<RouterView>
						{({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => {
							return createVNode(Component, { key: route.path })
						}}
					</RouterView>
				</n-layout>
			</n-layout>
		)
	}
})
</script>

<style lang="scss" scoped>
#app-layer {
	height: 100%;
	position: relative;
	overflow: hidden;
	:deep(.n-scrollbar-content) {
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}
	:deep(.n-layout) {
		background-color: transparent;
		z-index: 5;
	}
}
</style>
