<script lang="tsx">
import type { IArticle } from '@/api/pipe'
import { defineComponent, ref, nextTick, onUnmounted, Fragment, onActivated, onDeactivated } from 'vue'
import { AppContainer } from '@/components/global'
import { httpClientArticles } from '@/api/service'
import { initMounte } from '@/utils/utils-tool'
import { useBatter } from '@/utils/utils-instance'
import { useRxicon } from '@/hooks/hook-icon'
import { router } from '@/router'

export default defineComponent({
    name: 'Multiple',
    setup() {
        const { compute } = useRxicon()
        const { instance, current, setCurrent } = useBatter()
        const page = ref<number>(1)
        const size = ref<number>(10)
        const total = ref<number>(0)
        const more = ref<boolean>(true)
        const loading = ref<boolean>(true)
        const dataSource = ref<Array<IArticle>>([])

        /**列表接口**/
        const httpArticles = async (compose?: boolean) => {
            try {
                loading.value = true
                const { data } = await httpClientArticles({ page: page.value, size: size.value })
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
                    nextTick(() => httpArticles(true))
                }
            })
            onUnmounted(() => done())
            onActivated(() => setCurrent(true))
            onDeactivated(() => setCurrent(false))
        }

        /**跳转详情**/
        const onSelecter = ({ id }: IArticle) => {
            router.push(`/check/${id}`)
        }

        initMounte(() => {
            httpArticles()
            spinBatter()
        })

        return () => (
            <AppContainer
                class="app-pipe"
                loading={loading.value && total.value === 0}
                empty={!loading.value && total.value === 0}
            >
                {{
                    empty: () => <u-empty space="40px 0" size={240}></u-empty>,
                    placeholder: () => (
                        <Fragment>
                            {[1, 2, 3].map(key => (
                                <n-card key={key} class="vnode-column">
                                    <div class="vnode-column__content">
                                        <h1 class="vnode-title">
                                            <n-skeleton width="50%" style={{ margin: '3px 0' }} />
                                        </h1>
                                        <div class="vnode-description">
                                            <n-skeleton height="14px" style={{ margin: '3px 0' }} />
                                            <n-skeleton height="14px" style={{ margin: '6px 0' }} />
                                            <n-skeleton height="14px" width="80%" style={{ margin: '6px 0' }} />
                                        </div>
                                        <div class="vnode-user">
                                            <n-skeleton height="20px" width="36px" />
                                            <div class="vnode-user__bundle">
                                                <n-skeleton height="20px" width="116px" />
                                            </div>
                                            {[4, 5, 6].map(n => (
                                                <div key={n} class="vnode-user__bundle">
                                                    <n-skeleton height="20px" width="30px" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div class="vnode-column__cover">
                                        <u-scale>
                                            <n-skeleton height="100%" width="100%" />
                                        </u-scale>
                                    </div>
                                </n-card>
                            ))}
                        </Fragment>
                    ),
                    default: () => (
                        <Fragment>
                            {dataSource.value.map(item => {
                                return (
                                    <n-card key={item.id} class="vnode-column" onClick={() => onSelecter(item)}>
                                        <div class="vnode-column__content">
                                            <h1 class="vnode-title">
                                                <n-ellipsis line-clamp={1} tooltip={false}>
                                                    {item.title}
                                                </n-ellipsis>
                                            </h1>
                                            <div class="vnode-description">
                                                <n-ellipsis line-clamp={3} tooltip={false}>
                                                    {item.description}
                                                </n-ellipsis>
                                            </div>
                                            <div class="vnode-user">
                                                <div class="vnode-user__nickname">
                                                    <n-ellipsis line-clamp={1}>{item.user.nickname}</n-ellipsis>
                                                </div>
                                                <div class="vnode-user__bundle">
                                                    <time datetime={item.createTime}>{item.createTime}</time>
                                                </div>
                                                <div class="vnode-user__bundle">
                                                    <n-icon size={18} component={compute('EyeOutlined')}></n-icon>
                                                    <span>{item.browse || 0}</span>
                                                </div>
                                                <div class="vnode-user__bundle">
                                                    <n-icon size={18} component={compute('StarOutlined')}></n-icon>
                                                    <span>{item.star.total || 0}</span>
                                                </div>
                                                <div class="vnode-user__bundle">
                                                    <n-icon size={18} component={compute('CommentOutlined')}></n-icon>
                                                    <span>{item.comment || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="vnode-column__cover">
                                            <u-scale>
                                                <n-image
                                                    object-fit="cover"
                                                    lazy
                                                    preview-disabled
                                                    alt={item.title}
                                                    src={`${item.cover}?x-oss-process=style/resize-16-9`}
                                                >
                                                    {{ placeholder: () => <n-skeleton height="100%" width="100%" /> }}
                                                </n-image>
                                            </u-scale>
                                        </div>
                                    </n-card>
                                )
                            })}
                        </Fragment>
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
        margin-bottom: 40px;
        cursor: pointer;
        :deep(.n-card__content) {
            padding: 20px;
            display: flex;
        }
        &__cover {
            width: 240px;
            display: block;
        }
        &__content {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-right: 20px;
            .vnode-title {
                height: 24px;
                display: flex;
                flex-direction: column;
                line-height: 24px;
                font-size: 18px;
                margin: 0 0 10px;
            }
            .vnode-description {
                flex: 1;
                font-size: 14px;
                line-height: 20px;
                color: var(--text-color-3);
            }
            .vnode-user {
                height: 20px;
                display: flex;
                overflow: hidden;
                color: var(--text-color-3);
                font-size: 12px;
                &__nickname {
                    max-width: 100px;
                    overflow: hidden;
                }
                &__bundle {
                    margin-left: 15px;
                    display: flex;
                    align-items: center;
                    line-height: 1;
                    > span {
                        margin-left: 5px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
</style>
