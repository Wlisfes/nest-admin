import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import '@/style/index.scss'
import App from '@/App.vue'
import { createApp } from 'vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupI18n } from '@/lang'
import { setupEditor } from '@/hooks/hook-editor'

async function bootstrap() {
	const app = createApp(App)

	//国际化
	setupI18n(app)

	//挂载store
	setupStore(app)

	//挂载路由
	setupRouter(app)

	setupEditor(app)

	app.mount('#app', true)
}
bootstrap()
