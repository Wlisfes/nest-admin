import { createApp, defineComponent } from 'vue'
import { NDrawer, NDrawerContent, NDivider, NTooltip, NSwitch, NIcon } from 'naive-ui'
import { useBuilder } from '@/core/pipe/pipe-instance'
import { useSetStore } from '@/store/modules/set-store'
import Store from '@/store'
import style from '@/core/scss/init-setup.module.scss'

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

export function initSetup() {
	const { mount, unmount } = createApp(
		defineComponent({
			name: 'InitSetup',
			components: {},
			setup() {
				const store = useSetStore(Store)
				const { visible, observer, initUnmounte } = useBuilder()

				console.log(store.theme)

				return () => (
					<NDrawer
						v-model:show={visible.value}
						width={280}
						placement="right"
						on-after-leave={() => initUnmounte(unmount)}
					>
						<NDrawerContent title="项目配置" native-scrollbar={false}>
							<div class={style['app-setup']}>
								<NDivider title-placement="center">主题</NDivider>
								<div class={style['app-setup-theme']}>
									<NTooltip trigger="hover" placement="bottom">
										{{
											default: () => (
												<span>{store.theme === 'dark' ? '深色主题' : '浅色主题'}</span>
											),
											trigger: () => (
												<NSwitch
													value={store.theme}
													checked-value="dark"
													unchecked-value="light"
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
							</div>
						</NDrawerContent>
					</NDrawer>
				)
			}
		})
	)

	mount(document.createElement('div'))
}
