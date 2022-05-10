import { defineComponent, ref, onMounted } from 'vue'
import { NDrawer, NDrawerContent, NMenu, MenuOption } from 'naive-ui'
import { useBuilder, createComponent } from '@/core/pipe/pipe-instance'
import { useAppStore } from '@/store/modules/app-store'
import { onEnter } from '@/router'

export function init() {
	const app = createComponent(
		defineComponent({
			name: 'InitAside',
			setup() {
				const store = useAppStore()
				const { visible, observer, initUnmounte } = useBuilder()

				const onSelecter = (path: string) => {
					onEnter(path)
					visible.value = false
				}

				return () => (
					<NDrawer
						v-model:show={visible.value}
						width={220}
						placement="left"
						on-after-leave={() => initUnmounte(app.unmount)}
					>
						<NDrawerContent title="Admin" body-content-style={{ padding: 0 }}>
							<NMenu
								accordion
								root-indent={18}
								value={store.current}
								expanded-keys={store.expanded}
								collapsed={false}
								collapsed-width={64}
								options={store.router as Array<MenuOption>}
								on-update-value={onSelecter}
								onUpdateExpanded-keys={(keys: string[]) => store.setExpanded(keys)}
							/>
						</NDrawerContent>
					</NDrawer>
				)
			}
		})
	)

	app.mount(document.createElement('div'))
}
