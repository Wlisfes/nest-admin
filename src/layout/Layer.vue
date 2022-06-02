<script lang="tsx">
import type { LayoutInst } from 'naive-ui'
import { defineComponent, ref, computed, VNode, createVNode, CSSProperties } from 'vue'
import { RouterView, RouteLocationNormalizedLoaded } from 'vue-router'
import { MaskCover, BarLink, RollBack } from '@/layout/common'
import { instance } from '@/utils/utils-instance'

export default defineComponent({
	name: 'Layer',
	setup() {
		const contentRef = ref<LayoutInst | null>(null)
		const distance = ref<number>(0)
		const black = computed<CSSProperties>(() => ({
			backgroundColor: distance.value > 50 ? '#001529' : 'transparent'
		}))

		const onScrollbar = (e: { target: Element }) => {
			const { scrollTop, scrollHeight, clientHeight } = e.target
			distance.value = scrollTop
			instance.onScrollbar({
				distance: scrollTop,
				spin: scrollTop + clientHeight >= scrollHeight - 200
			})
		}

		return () => (
			<n-layout id="app-layer">
				<MaskCover></MaskCover>
				<RollBack
					visible={distance.value > 200}
					onTouch={() => contentRef.value?.scrollTo({ top: 0, behavior: 'smooth' })}
				></RollBack>
				<n-layout-header id="app-header" style={black.value}>
					<BarLink></BarLink>
				</n-layout-header>
				<n-layout-content
					ref={contentRef}
					style={{ top: '50px' }}
					position="absolute"
					native-scrollbar={false}
					on-scroll={onScrollbar}
				>
					<RouterView>
						{({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => {
							return createVNode(Component, { key: route.path })
						}}
					</RouterView>
				</n-layout-content>
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
	:deep(.n-layout-content) {
		background-color: transparent;
		z-index: 5;
	}
	:deep(.n-scrollbar-rail__scrollbar) {
		background-color: rgba(255, 255, 255, 0.5);
	}
}

#app-header {
	height: 50px;
	position: relative;
	transition: all 0.3s;
	z-index: 8;
}
</style>
