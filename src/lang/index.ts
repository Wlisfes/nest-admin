import { App, computed } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'

export const messages = {
	zh: {
		name: '妖雨纯',
		switch: '切换'
	},
	en: {
		name: 'Yao Yuchun',
		switch: 'Switch'
	}
}

export const i18n = createI18n({
	legacy: false,
	locale: 'en',
	messages
})
export function setupI18n(app: App<Element>) {
	app.use(i18n)
}

export function useLocale() {
	const { t } = useI18n()
	const locale = computed(() => i18n.global.locale.value)
	const Locale = computed(() => {
		switch (i18n.global.locale.value) {
			case 'zh':
				return messages.zh
			case 'en':
				return messages.en
			default:
				return messages.zh
		}
	})

	const onChange = async (command: 'zh' | 'en') => {
		i18n.global.locale.value = command
		return command
	}
	return { locale, Locale, t, onChange }
}
