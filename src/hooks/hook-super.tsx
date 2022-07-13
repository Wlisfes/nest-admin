import { ref } from 'vue'
import { useClipboard as useHookClipboard, ClipboardOptions } from '@vueuse/core'

export function useClipboard(option?: ClipboardOptions<undefined>) {
    const source = ref('')
    const notice = window.$notification
    const { text, copy, copied, isSupported } = useHookClipboard({ ...option, source })

    const onCater = async (value: string) => {
        try {
            source.value = value
            return await copy().then(() => {
                return notice.success({ content: '复制成功', duration: 2000 })
            })
        } catch (e) {
            return notice.error({ content: '复制失败', duration: 2000 })
        }
    }

    return { text, copied, isSupported, onCater }
}
