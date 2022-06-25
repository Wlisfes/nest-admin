import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n, messages } from '@/lang'

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
