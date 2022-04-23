<script lang="tsx">
import { defineComponent, Transition, VNode, createVNode } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { Aside, Header, NavTabs } from '@/layout/common'

export default defineComponent({
	name: 'Layout',
	setup() {
		const route = useRoute()

		return () => {
			return (
				<n-layout style={{ height: '100%' }} has-sider>
					<Aside></Aside>
					<n-layout>
						<Header></Header>
						<NavTabs></NavTabs>
						<n-layout position="absolute" style={{ top: '102px' }} native-scrollbar={false}>
							<RouterView key={route.path}>
								{{
									default: ({ Component }: { Component: VNode }) => {
										return (
											<Transition
												name="side-bottom"
												enter-from-class="side-bottom-enter"
												mode="out-in"
												appear
											>
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
#app-container {
	height: 100%;
	overflow: hidden;
	position: relative;
}

.side-bottom-enter-active,
.side-bottom-leave-active {
	transition: all 0.2s ease-in-out;
}
.side-bottom-enter {
	opacity: 0;
}
.side-bottom-leave-to {
	opacity: 0;
}
</style>
