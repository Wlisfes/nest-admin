<script lang="tsx">
import { defineComponent, ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppContainer } from '@/components/global'
import { usePlayer, NPlayer } from '@/hooks/hook-player'
import { httpClientCloud, httpCloudCheck, httpCloudFile } from '@/api'
import { initMounte } from '@/utils/utils-tool'

export default defineComponent({
    name: 'Player',
    setup() {
        const node = ref<ICloud>()
        const route = useRoute()
        const { mounte, init, destroy } = usePlayer()

        /**音视频详情**/
        const httpCloud = async () => {
            try {
                const { data } = await httpClientCloud({ id: route.params.id as unknown as number })
                node.value = data
                httpCheck(data.key, data.cover)
            } catch (e) {}
        }

        /**获取播放信息**/
        const httpCheck = async (key: string, cover: string) => {
            try {
                const data = await httpCloudCheck({ VideoId: key, AuthTimeout: 24 * 60 * 60 }).then(({ data }) => {
                    if (!data.RequestId || !data.base || data.list.length === 0) {
                        return httpCloudFile({ VideoId: key, AuthTimeout: 24 * 60 * 60 }).then(response => {
                            return { cover, url: response.data.Mezzanine.FileURL }
                        })
                    }
                    return { cover: cover || data.base.CoverURL, url: data.list?.[0].PlayURL }
                })
                init({ cover: data.cover, url: data.url, autoplay: true }).then(() => {
                    console.log('播放器初始化成功')
                })
            } catch (e) {}
        }

        initMounte(() => httpCloud())

        /**销毁播放器**/
        onUnmounted(() => destroy())

        return () => {
            return (
                <AppContainer class="app-pipe">
                    <NPlayer style={{ padding: '20px 0' }} onMounte={el => mounte(el)}></NPlayer>
                </AppContainer>
            )
        }
    }
})
</script>

<style lang="scss" scoped>
.app-pipe {
    width: 100%;
    max-width: 1480px;
    padding: 0 15px;
    margin: 20px auto 60px;
    box-sizing: border-box;
}
</style>
