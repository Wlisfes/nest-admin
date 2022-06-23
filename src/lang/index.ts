import { App } from 'vue'
import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import { createI18n } from 'vue-i18n'

export const messages = {
    zh: {
        ...zhCN,
        ...dateZhCN,
        name: '妖雨纯',
        switch: '切换'
    },
    en: {
        ...enUS,
        ...dateEnUS,
        name: 'Yao Yuchun',
        switch: 'Switch'
    }
}

export const i18n = createI18n({
    legacy: false,
    locale: 'cn',
    messages
})

export function setupI18n(app: App<Element>) {
    app.use(i18n)
}
