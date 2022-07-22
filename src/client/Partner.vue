<script lang="tsx">
import { defineComponent, ref, nextTick, onUnmounted, onActivated, onDeactivated } from 'vue'
import { AppContainer } from '@/components/global'
import { httpClientPartner } from '@/api'
import { initMounte } from '@/utils/utils-tool'
import { useBatter } from '@/utils/utils-instance'
import { NPreview } from '@/hooks/hook-editor'

export default defineComponent({
    name: 'Partner',
    setup() {
        const { instance, current, setCurrent } = useBatter()
        const page = ref<number>(1)
        const size = ref<number>(10)
        const total = ref<number>(0)
        const more = ref<boolean>(true)
        const loading = ref<boolean>(true)
        const dataSource = ref<Array<IPartner>>([])

        /**列表接口**/
        const httpPartner = async (compose?: boolean) => {
            try {
                loading.value = true
                const { data } = await httpClientPartner({ page: page.value, size: size.value })
                if (compose) {
                    dataSource.value = dataSource.value.concat(data.list)
                } else {
                    dataSource.value = data.list
                }
                total.value = data.total
                more.value = dataSource.value.length < total.value
            } catch (e) {}
            return (loading.value = false)
        }

        /**滚动加载**/
        const spinBatter = () => {
            const done = instance.observer.on('scroll', response => {
                if (response?.spin && current.value && !loading.value && more.value) {
                    page.value++
                    nextTick(() => httpPartner(true))
                }
            })
            onUnmounted(() => done())
            onActivated(() => setCurrent(true))
            onDeactivated(() => setCurrent(false))
        }

        initMounte(() => {
            httpPartner()
            spinBatter()
        })

        const initCover = (index: number, node: IPoster | null, alt?: string) => {
            return index > 8 ? null : (
                <li key={index} class="pipe-column">
                    <div class="pipe-position">
                        <div class="pipe-position__content">
                            {node?.url ? (
                                <n-image
                                    object-fit="cover"
                                    alt={alt}
                                    lazy
                                    preview-src={node.url}
                                    show-toolbar-tooltip
                                    src={`${node.url}?x-oss-process=style/resize`}
                                >
                                    {{ placeholder: () => <n-skeleton height="100%" width="100%" /> }}
                                </n-image>
                            ) : (
                                <n-skeleton height="100%" width="100%" />
                            )}
                        </div>
                    </div>
                </li>
            )
        }

        return () => (
            <AppContainer
                class="app-pipe"
                loading={loading.value && total.value === 0}
                empty={!loading.value && total.value === 0}
            >
                {{
                    empty: () => <u-empty space="40px 0" size={240}></u-empty>,
                    placeholder: () => (
                        <n-timeline>
                            <n-timeline-item type="info" class="vnode-column">
                                <n-card>
                                    <h4 class="vnode-column__title">
                                        <n-skeleton height="28.8px" width="45%" style={{ marginBottom: '10px' }} />
                                    </h4>
                                    <div class="vnode-column__user">
                                        <n-skeleton height="32px" width="32px" circle style={{ margin: '10px 0' }} />
                                        <div class="pipe-pointer">
                                            <n-skeleton height="14px" style={{ margin: '3px 0' }} />
                                            <n-skeleton height="14px" style={{ margin: '3px 0' }} />
                                        </div>
                                    </div>
                                    <ul class="vnode-column__cover">
                                        {[1, 2, 3, 4, 5, 6].map(key => initCover(key, null))}
                                    </ul>
                                </n-card>
                            </n-timeline-item>
                        </n-timeline>
                    ),
                    default: () => (
                        <n-timeline>
                            {dataSource.value.map((item, index) => {
                                return (
                                    <n-timeline-item
                                        type={index === 0 ? 'success' : 'info'}
                                        key={item.id}
                                        class="vnode-column"
                                    >
                                        <n-card>
                                            <h4 class="vnode-column__title">{item.title}</h4>
                                            <div class="vnode-column__user">
                                                <n-avatar
                                                    round
                                                    size={32}
                                                    src={item.user.avatar}
                                                    style={{ margin: '10px 0' }}
                                                />
                                                <div class="pipe-pointer">
                                                    <div>{item.user.nickname}</div>
                                                    <div>{item.createTime}</div>
                                                </div>
                                            </div>
                                            <NPreview value={item.html}></NPreview>
                                            {item.cover?.length > 0 && (
                                                <ul class="vnode-column__cover">
                                                    {item.cover.map((v, index) => {
                                                        return initCover(index, v, item.title)
                                                    })}
                                                </ul>
                                            )}
                                        </n-card>
                                    </n-timeline-item>
                                )
                            })}
                        </n-timeline>
                    )
                }}
            </AppContainer>
        )
    }
})
</script>

<style lang="scss" scoped>
.app-pipe {
    width: 100%;
    max-width: 1080px;
    padding: 0 15px;
    margin: 80px auto;
    box-sizing: border-box;
    .vnode-column {
        position: relative;
        :deep(.n-card__content) {
            padding: 20px;
        }
        &__title {
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 10px;
        }
        &__user {
            display: flex;
            align-items: center;
            padding: 0 10px;
            border-radius: 4px;
            margin-bottom: 20px;
            background-color: var(--back-color);
            .pipe-pointer {
                height: 52px;
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 10px;
                font-size: 14px;
                color: var(--text-color-2);
                line-height: 1.3;
            }
        }
        &__cover {
            max-width: 480px;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin: 20px 0 0;
            padding: 0;
            .pipe-column {
                max-width: 400px;
                width: 33.33333%;
                box-sizing: border-box;
                padding: 2px;
                cursor: pointer;
                list-style: none;
            }
            .pipe-position {
                width: 100%;
                padding-bottom: 100%;
                position: relative;
                overflow: hidden;
                :deep(.n-image) {
                    width: 100%;
                    height: 100%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                &__content {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background-color: var(--back-color);
                }
            }
        }
    }
}
</style>
