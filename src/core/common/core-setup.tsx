import { defineComponent, ref, computed } from 'vue'
import { NDrawer, NDrawerContent, NDivider, NTooltip, NSwitch, NIcon, NGrid, NGridItem, NSpace, NBadge } from 'naive-ui'
import { UIcon } from '@/components/global'
import { useSetStore } from '@/store/modules/set-store'
import { useProvider } from '@/hooks/hook-provider'
import { CoreNode } from '@/core/pipe/pipe-type'
import css from '@/core/scss/core-setup.module.scss'

const Checked = () => (
	<svg viewBox="0 0 512 512">
		<path d="M234 26h44v92h-44z"></path>
		<path d="M234 394h44v92h-44z"></path>
		<path d="M338.025 142.857l65.054-65.054l31.113 31.113l-65.054 65.054z"></path>
		<path d="M77.815 403.074l65.054-65.054l31.113 31.113l-65.054 65.054z"></path>
		<path d="M394 234h92v44h-92z"></path>
		<path d="M26 234h92v44H26z"></path>
		<path d="M338.029 369.14l31.112-31.113l65.054 65.054l-31.112 31.112z"></path>
		<path d="M77.802 108.92l31.113-31.113l65.054 65.054l-31.113 31.112z"></path>
		<path d="M256 358a102 102 0 1 1 102-102a102.12 102.12 0 0 1-102 102z"></path>
	</svg>
)
const UnChecked = () => (
	<svg viewBox="0 0 512 512">
		<path d="M264 480A232 232 0 0 1 32 248c0-94 54-178.28 137.61-214.67a16 16 0 0 1 21.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200c31.34 0 59.57-5.07 81.61-14.67a16 16 0 0 1 21.06 21.06C442.28 426 358 480 264 480z"></path>
	</svg>
)

export function useSetup(node?: CoreNode | null) {
	const visible = ref<boolean>(false)
	const init = (value: boolean) => {
		visible.value = value
	}

	const Component = defineComponent({
		name: 'Core-Setup',
		emits: ['close'],
		setup(props, { emit }) {
			const { primaryVars } = useProvider()
			const store = useSetStore()
			const to = computed<string | HTMLElement>(() => node?.to || document.body)
			const onClose = () => emit('close', false)

			return () => (
				<NDrawer
					to={to.value}
					v-model:show={visible.value}
					width={280}
					placement="right"
					on-after-leave={onClose}
				>
					<NDrawerContent title="项目配置" native-scrollbar={false}>
						<div class={css['setup-content']}>
							<div class={css['vnode-column']}>
								<NDivider style={{ margin: '10px 0' }}>主题</NDivider>
								<NTooltip trigger="hover" placement="bottom">
									{{
										default: () => <span>{store.theme === 'dark' ? '浅色主题' : '深色主题'}</span>,
										trigger: () => (
											<NSwitch
												value={store.theme}
												checked-value="dark"
												unchecked-value="light"
												rail-style={() => ({ background: '#000e1c' })}
												on-update:value={(theme: 'dark' | 'light') => store.setTheme(theme)}
											>
												{{
													checked: () => (
														<NIcon size="14" color="#ffd93b">
															<Checked />
														</NIcon>
													),
													unchecked: () => (
														<NIcon size="14" color="#ffd93b">
															<UnChecked />
														</NIcon>
													)
												}}
											</NSwitch>
										)
									}}
								</NTooltip>
							</div>
							<div class={css['vnode-column']}>
								<NDivider style={{ margin: '24px 0 10px' }}>系统主题</NDivider>
								<NGrid cols={9} x-gap={4} y-gap={4}>
									{primaryVars.value.map((color, index) => (
										<NGridItem key={index}>
											<div
												class={{ [css['color-scope']]: true }}
												style={{ background: color }}
												onClick={e => store.setPrimaryColor(color)}
											>
												{store.primaryColor === color && (
													<UIcon name="antd-check" color="#ffffff" />
												)}
											</div>
										</NGridItem>
									))}
								</NGrid>
							</div>
							<div class={css['vnode-column']}>
								<NDivider style={{ margin: '24px 0 10px' }}>导航栏风格</NDivider>
								<NSpace size={15}>
									<div class={css['nav-style']} onClick={e => store.setInverted('dark')}>
										<img
											src={new URL('/src/assets/base/nav-theme-dark.png', import.meta.url).href}
											alt=""
										/>
										{store.inverted === 'dark' && <NBadge dot color="#19be6b" />}
									</div>
									<div class={css['nav-style']} onClick={e => store.setInverted('light')}>
										<img
											src={new URL('/src/assets/base/nav-theme-light.png', import.meta.url).href}
											alt=""
										/>
										{store.inverted === 'light' && <NBadge dot color="#19be6b" />}
									</div>
									<div class={css['nav-style']} onClick={e => store.setInverted('nav-dark')}>
										<img
											src={new URL('/src/assets/base/all-theme-dark.png', import.meta.url).href}
											alt=""
										/>
										{(store.theme === 'dark' || store.inverted === 'nav-dark') && (
											<NBadge dot color="#19be6b" />
										)}
									</div>
								</NSpace>
							</div>
						</div>
					</NDrawerContent>
				</NDrawer>
			)
		}
	})

	return { init, Component }
}
