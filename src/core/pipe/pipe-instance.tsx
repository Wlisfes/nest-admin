import { defineComponent, createApp, Component, createVNode, ref, onMounted } from 'vue'
import {
	NConfigProvider,
	NLoadingBarProvider,
	NDialogProvider,
	NNotificationProvider,
	NMessageProvider
} from 'naive-ui'
import { Observer } from '@/utils/utils-observer'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { useProvider } from '@/hooks/hook-provider'

export function createComponent(RootComponent: Component) {
	const app = createApp(
		defineComponent({
			name: 'CoreProvider',
			setup() {
				const { theme, themeOverrides } = useProvider()

				return () => (
					<NConfigProvider abstract theme={theme.value} theme-overrides={themeOverrides.value}>
						<NLoadingBarProvider>
							<NDialogProvider>
								<NNotificationProvider>
									<NMessageProvider>{createVNode(RootComponent)}</NMessageProvider>
								</NNotificationProvider>
							</NDialogProvider>
						</NLoadingBarProvider>
					</NConfigProvider>
				)
			}
		})
	)

	//挂载store
	setupStore(app)
	//挂载路由
	setupRouter(app)

	return app
}

export function useBuilder() {
	const visible = ref<boolean>(false)
	const observer = new Observer()
	onMounted(() => {
		visible.value = true
	})

	const initUnmounte = (handler?: Function) => {
		handler?.()
		observer.emit('close')
	}

	return { visible, observer, initUnmounte }
}
