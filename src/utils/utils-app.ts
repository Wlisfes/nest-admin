import { createApp, createVNode, nextTick, type Component } from 'vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupI18n } from '@/lang'
import { setupEditor } from '@/hooks/hook-editor'
import { AppProvider } from '@/components/global'

type IParameter = {}

export function createComponent(rootComponent: Component, parameter?: IParameter) {
    const el = document.createElement('div')
    const app = createApp(
        createVNode(AppProvider, null, {
            default: () => createVNode(rootComponent)
        })
    )

    const mounte = (to?: HTMLElement, handler?: Function): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                app.mount(el, true)
                if (to) {
                    to.appendChild(el)
                } else {
                    document.body.appendChild(el)
                }
                handler?.()
                resolve()
            } catch (e: unknown) {
                reject(e)
            }
        })
    }

    const unmount = (handler?: Function): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                app.unmount()
                el.remove()
                nextTick(() => {
                    handler?.()
                    resolve()
                })
            } catch (e: unknown) {
                reject(e)
            }
        })
    }

    setupI18n(app) //国际化
    setupStore(app) //挂载store
    setupRouter(app) //挂载路由
    setupEditor(app) //注册富文本组件

    return { app, el, mounte, unmount }
}
