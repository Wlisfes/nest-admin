import { createApp, createVNode, type Component } from 'vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupI18n } from '@/lang'
import { setupEditor } from '@/hooks/hook-editor'
import { AppProvider } from '@/components/global'

export function createComponent(rootComponent: Component) {
    const app = createApp(
        createVNode(AppProvider, null, {
            default: () => createVNode(rootComponent)
        })
    )

    setupI18n(app) //国际化
    setupStore(app) //挂载store
    setupRouter(app) //挂载路由
    setupEditor(app) //注册富文本组件

    return { app }
}
