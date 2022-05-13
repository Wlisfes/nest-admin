import { defineComponent, ref, computed } from 'vue'
import {
	NDrawer,
	NDrawerContent,
	NDivider,
	NTooltip,
	NSwitch,
	NIcon,
	NGrid,
	NGridItem,
	NSpace,
	NBadge,
	NSelect
} from 'naive-ui'
import { UIcon } from '@/components/global'
import { useDvcStore } from '@/store/modules/dvc-store'
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
			const { primaryVars, animate } = useProvider()
			const dvc = useDvcStore()
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
										default: () => <span>{dvc.theme === 'dark' ? '浅色主题' : '深色主题'}</span>,
										trigger: () => (
											<NSwitch
												value={dvc.theme}
												checked-value="dark"
												unchecked-value="light"
												rail-style={() => ({ background: '#000e1c' })}
												on-update:value={(theme: 'dark' | 'light') => dvc.setTheme(theme)}
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
												onClick={e => dvc.setPrimaryColor(color)}
											>
												{dvc.primaryColor === color && (
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
									<div class={css['nav-style']} onClick={e => dvc.setInverted('dark')}>
										<img
											src={new URL('/src/assets/base/nav-theme-dark.png', import.meta.url).href}
											alt=""
										/>
										{dvc.inverted === 'dark' && <NBadge dot color="#19be6b" />}
									</div>
									<div class={css['nav-style']} onClick={e => dvc.setInverted('light')}>
										<img
											src={new URL('/src/assets/base/nav-theme-light.png', import.meta.url).href}
											alt=""
										/>
										{dvc.inverted === 'light' && dvc.theme !== 'dark' && (
											<NBadge dot color="#19be6b" />
										)}
									</div>
									<div class={css['nav-style']} onClick={e => dvc.setInverted('nav-dark')}>
										<img
											src={new URL('/src/assets/base/all-theme-dark.png', import.meta.url).href}
											alt=""
										/>
										{(dvc.theme === 'dark' || dvc.inverted === 'nav-dark') && (
											<NBadge dot color="#19be6b" />
										)}
									</div>
								</NSpace>
							</div>
							<div class={css['vnode-column']}>
								<NDivider style={{ margin: '24px 0 10px' }}>界面显示</NDivider>
								<NSpace vertical size={16}>
									<div class={css['column-scope']}>
										<div style={{ flex: 1 }}>显示重载页面按钮</div>
										<NSwitch value={dvc.reload} on-update:value={dvc.setReload}></NSwitch>
									</div>
									<div class={css['column-scope']}>
										<div style={{ flex: 1 }}>显示面包屑导航</div>
										<NSwitch value={dvc.breadcr} on-update:value={dvc.setBreadcr}></NSwitch>
									</div>
									<div class={css['column-scope']}>
										<div style={{ flex: 1 }}>显示多页签</div>
										<NSwitch value={dvc.better} on-update:value={dvc.setBetter}></NSwitch>
									</div>
								</NSpace>
							</div>
							<div class={css['vnode-column']}>
								<NDivider style={{ margin: '24px 0 10px' }}>动画</NDivider>
								<NSpace vertical size={16}>
									<div class={css['column-scope']}>
										<div style={{ flex: 1 }}>禁用动画</div>
										<NSwitch value={dvc.transition} on-update:value={dvc.setTransition}></NSwitch>
									</div>
									<div class={css['column-scope']}>
										<div style={{ flex: 1 }}>动画类型</div>
										<div style={{ flex: 1 }}>
											<NSelect
												value={dvc.transitionName}
												disabled={dvc.transition}
												options={animate.value}
												on-update:value={dvc.setTransitionName}
											></NSelect>
										</div>
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
