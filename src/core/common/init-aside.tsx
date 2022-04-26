import { createApp, defineComponent, reactive, onMounted } from 'vue'
import { useBuilder } from '@/core/pipe/pipe-instance'
import { NDrawer, NDrawerContent } from 'naive-ui'

export function init() {
	const { mount, unmount } = createApp(
		defineComponent({
			name: 'InitAside',
			setup() {
				const { visible, observer, initUnmounte } = useBuilder()

				return () => (
					<NDrawer
						v-model:show={visible.value}
						width={220}
						placement="left"
						on-after-leave={() => initUnmounte(unmount)}
					>
						<NDrawerContent title="Admin"></NDrawerContent>
					</NDrawer>
				)
			}
		})
	)

	mount(document.createElement('div'))
}
