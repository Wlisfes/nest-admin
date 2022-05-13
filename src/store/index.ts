import type { App } from 'vue'
import { createPinia } from 'pinia'
import PiniaPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(PiniaPersist)

export function setupStore(app: App<Element>) {
	app.use(store)
}

export default store
