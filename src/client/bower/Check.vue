<script lang="tsx">
import type { IArticle } from '@/api/pipe'
import { defineComponent, ref, nextTick, onUnmounted, Fragment } from 'vue'
import { useRoute } from 'vue-router'
import { AppContainer } from '@/components/global'
import { httpClientArticle } from '@/api/service'
import { initMounte } from '@/utils/utils-tool'
import { NPreview } from '@/hooks/hook-editor'
import { useRxicon } from '@/hooks/hook-icon'

export default defineComponent({
    name: 'Check',
    setup() {
        const { compute } = useRxicon()
        const route = useRoute()
        const node = ref<IArticle>()
        const loading = ref<boolean>(true)
        const html = ref()

        /**文章详情**/
        const httpArticle = async () => {
            try {
                const { data } = await httpClientArticle({ id: route.params.id as unknown as number })
                node.value = data
            } catch (e) {}
            return (loading.value = false)
        }

        initMounte(() => {
            httpArticle()
        })

        return () => (
            <AppContainer class="app-pipe" loading={loading.value && !node.value} empty={!loading.value && !node.value}>
                {{
                    empty: () => <u-empty space="40px 0" size={240}></u-empty>,
                    placeholder: () => (
                        <n-card class="vnode-column">
                            <h1 class="vnode-column__title">
                                <n-skeleton width="60%" height="32px" style={{ margin: '6px 0' }} />
                            </h1>
                            <div class="vnode-column__user">
                                <n-skeleton width="48px" height="48px" round />
                                <div class="user-content">
                                    <div class="user-content__column">
                                        <n-skeleton width="48px" height="20px" />
                                        <n-skeleton height="20px" style={{ flex: 1, marginLeft: '20px' }} />
                                    </div>
                                    <div class="user-content__source">
                                        <n-skeleton width="60px" height="20px" />
                                        <n-skeleton height="20px" style={{ flex: 1, marginLeft: '8px' }} />
                                    </div>
                                </div>
                            </div>
                            <n-skeleton height="400px" />
                            <div>
                                <n-skeleton height="28px" width="45%" style={{ margin: '20px 0 16px' }} />
                                <n-skeleton text repeat={2} height="18px" style={{ margin: '0 0 5px' }} />
                                <n-skeleton text height="18px" width="60%" />
                            </div>
                        </n-card>
                    ),
                    default: () => (
                        <n-card class="vnode-column">
                            <h1 class="vnode-column__title">{node.value?.title}</h1>
                            <div class="vnode-column__user">
                                <n-avatar
                                    round
                                    size={48}
                                    src={`${node.value?.user.avatar}?x-oss-process=style/resize-1-1`}
                                />
                                <div class="user-content">
                                    <div class="user-content__column">
                                        <div class="vnode-bundle" style={{ fontSize: '16px' }}>
                                            {node.value?.user.nickname}
                                        </div>
                                        <div class="vnode-bundle">{node.value?.createTime}</div>
                                        <div class="vnode-bundle">
                                            <n-icon size={18} component={compute('EyeOutlined')}></n-icon>
                                            <span style={{ marginLeft: '5px' }}>{node.value?.browse || 0}</span>
                                        </div>
                                        <div class="vnode-bundle">
                                            <n-icon size={18} component={compute('StarOutlined')}></n-icon>
                                            <span style={{ marginLeft: '5px' }}>{node.value?.star.total || 0}</span>
                                        </div>
                                    </div>
                                    <div class="user-content__source">
                                        <span>分类标签:</span>
                                        <div style={{ marginLeft: '8px' }}>
                                            <n-space size={8}>
                                                {node.value?.source.map(item => (
                                                    <n-tag size="small" bordered={false} color={{ color: item.color }}>
                                                        {item.name}
                                                    </n-tag>
                                                ))}
                                            </n-space>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <NPreview value={node.value?.content}></NPreview>
                        </n-card>
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
    margin: 20px auto;
    box-sizing: border-box;
}

.vnode-column {
    flex: 1;
    :deep(.n-card__content) {
        padding: 20px;
    }

    &__title {
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 20px;
        overflow: hidden;
    }

    &__user {
        height: 68px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        border-radius: 4px;
        margin-bottom: 20px;
        background-color: var(--back-color);
        .user-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 15px;
            &__column {
                height: 24px;
                margin-bottom: 5px;
                display: flex;
                align-items: center;
                font-size: 12px;
                line-height: 1.5;
                .vnode-bundle {
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    cursor: pointer;
                }
            }
            &__source {
                height: 22px;
                display: flex;
                align-items: center;
                font-size: 12px;
            }
        }
    }
}
</style>
