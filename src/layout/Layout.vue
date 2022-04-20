<script lang="tsx">
import { defineComponent, Transition, createVNode, VNode } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { Aside } from '@/layout/common'

export default defineComponent({
	name: 'Layout',
	setup() {
		const route = useRoute()

		return () => {
			return (
				<el-container id="app-container" direction="horizontal">
					<Aside></Aside>
					<el-container direction="vertical">
						<el-main class="app-main">
							<el-scrollbar ref="wrapper" class="app-main-wrapper">
								<RouterView key={route.path}>
									{{
										default: ({ Component }: { Component: VNode }) => {
											return (
												<Transition name="side-bottom" mode="out-in" appear>
													{createVNode(Component)}
												</Transition>
											)
										}
									}}
								</RouterView>
							</el-scrollbar>
						</el-main>
					</el-container>
				</el-container>
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
	.app-main {
		padding: 0;
		display: flex;
		flex-direction: column;
		background-color: #f5f7f9;
		overflow: hidden;
		&-wrapper {
			overflow-x: hidden;
			flex: 1;
			display: flex;
			flex-direction: column;
			:deep(.el-scrollbar__view) {
				min-height: 100%;
				display: flex;
				flex-direction: column;
				overflow: hidden;
			}
			:deep(.el-scrollbar__wrap) {
				overflow-x: hidden;
				margin-bottom: 0 !important;
			}
		}
	}
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
