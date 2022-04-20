import '@/style/index.scss'
import App from '@/App.vue'
import { createApp } from 'vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

async function bootstrap() {
	const app = createApp(App)

	//挂载store
	setupStore(app)

	//挂载路由
	setupRouter(app)

	app.mount('#app', true)
}
bootstrap()
