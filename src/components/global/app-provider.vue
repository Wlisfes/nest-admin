<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useLoadingBar, useNotification, useMessage, useDialog } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'
import { useLocale } from '@/hooks/hook-locale'

const RComponent = defineComponent({
    name: 'RComponent',
    setup(props, { slots }) {
        window.$loading = useLoadingBar()
        window.$notification = useNotification()
        window.$message = useMessage()
        window.$dialog = useDialog()

        return () => <Fragment>{slots.default?.()}</Fragment>
    }
})

export default defineComponent({
    name: 'AppProvider',
    setup(props, { slots }) {
        const { theme, themeOverrides } = useProvider()
        const { Locale } = useLocale()

        return () => (
            <n-config-provider
                abstract
                theme={theme.value}
                theme-overrides={themeOverrides.value}
                locale={Locale.value}
                date-locale={Locale.value}
            >
                <n-loading-bar-provider>
                    <n-dialog-provider>
                        <n-notification-provider max={3}>
                            <n-message-provider>
                                <RComponent>{{ default: slots.default }}</RComponent>
                            </n-message-provider>
                        </n-notification-provider>
                    </n-dialog-provider>
                </n-loading-bar-provider>
            </n-config-provider>
        )
    }
})
</script>
