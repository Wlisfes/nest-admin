<script lang="tsx">
import { defineComponent, onMounted, onUnmounted, Fragment } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/store/modules/app-store'
import { useClient } from '@/utils/utils-instance'
import { initMounte } from '@/utils/utils-tool'

export default defineComponent({
    name: 'App',
    setup() {
        const { client } = useClient()
        const app = useAppStore()

        initMounte(() => app.initBanner())
        onUnmounted(() => client.off())
        onMounted(() => {
            client.listener().then(() => client.on())
        })

        return () => (
            <Fragment>
                <RouterView></RouterView>
            </Fragment>
        )
    }
})
</script>
