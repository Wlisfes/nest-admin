<script lang="tsx">
import { defineComponent, Transition, VNode, createVNode, computed, CSSProperties } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { Aside, Header, NavBetter } from '@/layout/common'
import { useSetStore } from '@/store/modules/set-store'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
	name: 'Layout',
	setup() {
		const set = useSetStore()
		const route = useRoute()
		const { vars } = useProvider()
		const css = computed<CSSProperties>(() => {
			return {
				top: set.better ? '102px' : '60px',
				backgroundColor: vars.value.backColor
			}
		})
		const name = computed(() => {})

		return () => {
			return (
				<n-layout style={{ height: '100%' }} has-sider>
					<Aside></Aside>
					<n-layout>
						<Header></Header>
						{set.better && <NavBetter></NavBetter>}
						<n-layout class="app-container" position="absolute" style={css.value} native-scrollbar={false}>
							<RouterView key={route.path}>
								{{
									default: ({ Component }: { Component: VNode }) => {
										return (
											<Transition name={set.transitionName} mode="out-in" appear>
												{createVNode(Component)}
											</Transition>
										)
									}
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
