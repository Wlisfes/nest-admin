import { ref } from 'vue'
import { useClipboard as useHookClipboard, ClipboardOptions } from '@vueuse/core'

export function useClipboard(option?: ClipboardOptions<undefined>) {
    const source = ref('')
    const notice = window.$notification
    const { text, copy, copied, isSupported } = useHookClipboard({ ...option, source })

    const onRoter = (value: string) => {
        source.value = value
        copy().then(() => {
            notice.success({ content: '复制成功', duration: 2000 })
        })
    }

    return { text, copied, isSupported, onRoter }
}
