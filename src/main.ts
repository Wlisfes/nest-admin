import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import '@/style/index.scss'
import App from '@/App.vue'
import { createComponent } from '@/utils/utils-app'

async function bootstrap() {
    const { app } = createComponent(App)

    app.mount('#app', true)
}
bootstrap()
