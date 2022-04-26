import { createApp, Component, reactive, ref, onMounted } from 'vue'
import { Observer } from '@/utils/utils-observer'

export function useComponent(RootComponent: Component) {
	const app = createApp(RootComponent)
	const root = document.createElement('div')
	document.body.appendChild(root)
	app.mount(root)

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
