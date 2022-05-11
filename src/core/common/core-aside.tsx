import { defineComponent, ref, computed } from 'vue'
import { NDrawer, NDrawerContent, NMenu, MenuOption } from 'naive-ui'
import { useAppStore } from '@/store/modules/app-store'
import { onEnter } from '@/router'
import { CoreNode } from '@/core/pipe/pipe-type'

export function useAside(node?: CoreNode | null) {
	const visible = ref<boolean>(false)
	const init = (value: boolean) => {
		visible.value = value
	}

	const Component = defineComponent({
		name: 'Core-Aside',
		emits: ['close'],
		setup(props, { emit }) {
			const app = useAppStore()
			const to = computed<string | HTMLElement>(() => node?.to || document.body)
			const onClose = () => emit('close')

			const onSelecter = (path: string) => {
				onEnter(path)
				onClose()
				init(false)
			}

			return () => (
				<NDrawer
					to={to.value}
					v-model:show={visible.value}
					width={220}
					placement="left"
					on-mask-click={onClose}
				>
					<NDrawerContent title="Admin" body-content-style={{ padding: 0 }}>
						<NMenu
							accordion
							root-indent={18}
							value={app.current}
							expanded-keys={app.expanded}
							collapsed={false}
							collapsed-width={64}
							options={app.router as Array<MenuOption>}
							on-update-value={onSelecter}
							onUpdateExpanded-keys={(keys: string[]) => app.setExpanded(keys)}
						/>
					</NDrawerContent>
				</NDrawer>
			)
		}
	})

	return { init, Component }
}
