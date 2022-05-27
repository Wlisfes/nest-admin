<script lang="tsx">
import { defineComponent, Transition, VNode, createVNode, computed, CSSProperties } from 'vue'
import { RouterView, RouteLocationNormalizedLoaded } from 'vue-router'
import { Aside, Header, NavBetter } from '@/layout/common'
import { useDvcStore } from '@/store/modules/dvc-store'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
	name: 'Layout',
	setup() {
		const dvc = useDvcStore()
		const { vars } = useProvider()
		const css = computed<CSSProperties>(() => {
			return {
				top: dvc.better ? '102px' : '60px',
				backgroundColor: vars.value.backColor
			}
		})
		const name = computed(() => {
			return dvc.transition ? '' : dvc.transitionName
		})

		return () => {
			return (
				<n-layout style={{ height: '100%' }} has-sider>
					<Aside></Aside>
					<n-layout>
						<Header></Header>
						{dvc.better && <NavBetter></NavBetter>}
						<n-layout class="app-container" position="absolute" style={css.value} native-scrollbar={false}>
							<RouterView>
								{({ Component, route }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => {
									return (
										<Transition name={name.value} mode="out-in" appear>
											{createVNode(Component, { key: route.path })}
										</Transition>
									)
								}}
							</RouterView>
						</n-layout>
					</n-layout>
				</n-layout>
			)
		}
	}
})
</script>

<style lang="scss" scoped>
.app-container {
	:deep(.n-scrollbar-content) {
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}
}
</style>
