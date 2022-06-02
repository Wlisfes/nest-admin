import { defineComponent, ref, computed } from 'vue'
import { NDrawer, NDrawerContent, NMenu, MenuOption } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'
import { useAppStore } from '@/store/modules/app-store'
import { useDvcStore } from '@/store/modules/dvc-store'
import { client } from '@/utils/utils-instance'
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
			const { vars, inverted } = useProvider()
			const app = useAppStore()
			const dvc = useDvcStore()
			const to = computed<string | HTMLElement>(() => node?.to || document.body)
			const color = computed(() => {
				if (dvc.theme === 'dark' || dvc.inverted === 'dark' || dvc.inverted === 'nav-dark') {
					return 'rgb(24, 24, 28)'
				}
				return vars.value.cardColor
			})
			const done = client.observer.on('resize', e => {
				if (e?.device !== 'MOBILE') {
					init(false)
				}
			})

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
					<NDrawerContent
						title="Admin"
						body-content-style={{ padding: 0, backgroundColor: color.value }}
						header-style={{ display: 'none' }}
					>
						<NMenu
							accordion
							inverted={inverted.value.aside}
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
