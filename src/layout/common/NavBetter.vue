<script lang="tsx">
import { defineComponent, onMounted, ref, watch, nextTick, computed } from 'vue'
import { useAppStore } from '@/store/modules/app-store'
import { Icons, useCompute } from '@/hooks/hook-icon'
import { onReload, router } from '@/router'
import { stopEvent } from '@/utils/utils-event'
import BScroll, { BScrollInstance } from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(MouseWheel)
BScroll.use(ObserveDOM)

type IOption = { label: string; key: string; icon: keyof typeof Icons; disabled: boolean }

export default defineComponent({
    name: 'NavBetter',
    setup() {
        const { compute } = useCompute()
        const app = useAppStore()
        const wrapper = ref<HTMLElement>()
        const scope = ref<HTMLElement>()
        const better = ref<BScrollInstance>()
        const trigger = ref<boolean>(false)
        const disabled = computed(() => app.multiple.length < 2)

        //初始化BScroll
        onMounted(() => {
            better.value = new BScroll(wrapper.value as HTMLElement, {
                scrollX: true,
                scrollY: false,
                bounce: false,
                mouseWheel: true,
                observeDOM: true
            })
        })

        //滚动到激活菜单
        watch(
            () => app.current,
            () => {
                nextTick(() => {
                    trigger.value = (scope.value?.clientWidth ?? 0) >= (wrapper.value?.clientWidth ?? 0)
                    const el = document.querySelector(`.wrapper-column-scope.is-active`) as HTMLElement
                    better.value?.refresh()
                    el && better.value?.scrollToElement(el, 300, 0, false)
                })
            }
        )

        //关闭单个历史路径
        const onCloseScope = (path: string) => {
            app.closeRoute('close-current', path).finally(() => {
                if (path === app.current) {
                    router.push({
                        path: app.multiple[app.multiple.length - 1].key
                    })
                }
            })
        }

        //右侧下拉回调
        const onSelecter = (key: string) => {
            switch (key) {
                case 'reload':
                    onReload(app.current)
                    break
                case 'close-current':
                    app.closeRoute(key, app.current).finally(() => {
                        router.push({
                            path: app.multiple[app.multiple.length - 1].key
                        })
                    })
                    break
                case 'close-other':
                    app.closeRoute(key)
                    break
                case 'close-all':
                    app.closeRoute(key).finally(() => router.push('/'))
                    break
            }
        }

        return () => (
            <n-el tag="div" class="app-nav">
                {trigger.value && <n-icon style={{ marginRight: '10px' }} component={compute('LeftOutlined')}></n-icon>}
                <div ref={wrapper} class="wrapper">
                    <div ref={scope} class="wrapper-container">
                        {app.multiple.map(item => (
                            <div class="wrapper-column" key={item.key} onClick={e => router.push(item.key)}>
                                <n-el
                                    tag="div"
                                    class={{ 'wrapper-column-scope': true, 'is-active': item.key === app.current }}
                                >
                                    <span>{item.meta.title}</span>
                                    {!disabled.value && item.key !== '/admin/console' && (
                                        <n-icon
                                            size={14}
                                            style={{ marginLeft: '4px', marginRight: '-2px' }}
                                            component={compute('CloseOutlined')}
                                            onClick={(e: Event) => stopEvent(e, () => onCloseScope(item.key))}
                                        ></n-icon>
                                    )}
                                </n-el>
                            </div>
                        ))}
                    </div>
                </div>
                {trigger.value && <n-icon style={{ marginLeft: '10px' }} component={compute('RightOutlined')}></n-icon>}
                <n-dropdown
                    options={[
                        { label: '刷新当前', key: 'reload', icon: 'ReloadOutlined' },
                        { label: '关闭当前', key: 'close-current', icon: 'CloseOutlined', disabled: disabled.value },
                        {
                            label: '关闭其他',
                            key: 'close-other',
                            icon: 'ColumnWidthOutlined',
                            disabled: disabled.value
                        },
                        { label: '关闭全部', key: 'close-all', icon: 'LineOutlined', disabled: disabled.value }
                    ]}
                    render-icon={(u: IOption) => <n-icon component={compute(u.icon)}></n-icon>}
                    show-arrow
                    on-select={onSelecter}
                >
                    <n-icon style={{ marginLeft: '10px' }} component={compute('MenuOutlined')}></n-icon>
                </n-dropdown>
            </n-el>
        )
    }
})
</script>

<style lang="scss" scoped>
.app-nav {
    display: flex;
    align-items: center;
    position: relative;
    background-color: var(--back-color);
    padding: 5px 12px;
    .wrapper {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        &-container {
            display: inline-block;
        }
        .wrapper-column {
            display: inline-block;
            margin-right: 10px;
            &:last-child {
                margin-right: 0;
            }
            &-scope {
                position: relative;
                line-height: 32px;
                padding: 0 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                color: var(--text-color);
                font-size: var(--font-size);
                background-color: var(--card-color);
                border-radius: var(--border-radius);
                transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                &.is-active {
                    color: var(--primary-color);
                }
                &:hover {
                    color: var(--primary-color);
                }
            }
        }
    }
}
</style>
