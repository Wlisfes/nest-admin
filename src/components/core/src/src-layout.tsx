import type { MenuOption } from 'naive-ui'
import { onMounted, computed } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useProvider } from '@/hooks/hook-provider'
import { useRxicon } from '@/hooks/hook-icon'
import { useAppStore } from '@/store/modules/app-store'
import { useDvcStore } from '@/store/modules/dvc-store'
import { router } from '@/router'
import { useClient } from '@/utils/utils-instance'
import { loadFile } from '@/utils/utils-tool'
import { createComponent } from '@/utils/utils-app'
import css from '@/components/core/scss/src-layout.module.scss'

export function fetchSider() {
    const { el, mounte, unmount } = createComponent({
        name: 'FetchSider',
        setup() {
            const { state, setState } = useState({ visible: false })
            const { client } = useClient()
            const { vars, inverted } = useProvider()
            const app = useAppStore()
            const dvc = useDvcStore()
            const color = computed(() => {
                if (dvc.theme === 'dark' || dvc.inverted === 'dark' || dvc.inverted === 'nav-dark') {
                    return 'rgb(24, 24, 28)'
                }
                return vars.value.cardColor
            })
            const done = client.observer.on('resize', e => {
                if (e?.device !== 'MOBILE') {
                    setState({ visible: false })
                }
            })
            const onSelecter = (path: string) => {
                setState({ visible: false }).then(() => {
                    if (app.current !== path) {
                        router.push(path)
                    }
                })
            }

            onMounted(() => setState({ visible: true }))

            return () => (
                <n-drawer to={el} v-model:show={state.visible} width={220} placement="left" onAfterLeave={unmount}>
                    <n-drawer-content
                        body-content-style={{ padding: 0, backgroundColor: color.value }}
                        header-style={{ display: 'none' }}
                    >
                        <n-menu
                            accordion
                            inverted={inverted.value.aside}
                            root-indent={18}
                            value={app.current}
                            expanded-keys={app.expanded}
                            collapsed={false}
                            collapsed-width={64}
                            options={app.router as Array<MenuOption>}
                            on-update-value={onSelecter}
                            onUpdateExpanded-keys={(keys: string[]) => app.setExpanded(keys)}
                        ></n-menu>
                    </n-drawer-content>
                </n-drawer>
            )
        }
    })

    mounte().catch(e => {
        console.log(e)
    })
}

export function fetchSettin() {
    const { el, mounte, unmount } = createComponent({
        name: 'FetchSettin',
        setup() {
            const { state, setState } = useState({ visible: false })
            const { Icon, compute } = useRxicon()
            const { primaryVars, animate } = useProvider()
            const dvc = useDvcStore()

            onMounted(() => setState({ visible: true }))

            return () => (
                <n-drawer v-model:show={state.visible} to={el} width={280} placement="right" onAfterLeave={unmount}>
                    <n-drawer-content title="项目配置" native-scrollbar={false}>
                        <div class={css['setup-content']}>
                            <div class={css['vnode-column']}>
                                <n-divider style={{ margin: '10px 0' }}>主题</n-divider>
                                <n-tooltip trigger="hover" placement="bottom">
                                    {{
                                        default: () => <span>{dvc.theme === 'dark' ? '浅色主题' : '深色主题'}</span>,
                                        trigger: () => (
                                            <n-switch
                                                value={dvc.theme}
                                                checked-value="dark"
                                                unchecked-value="light"
                                                rail-style={() => ({ background: '#000e1c' })}
                                                on-update:value={(theme: 'dark' | 'light') => dvc.setTheme(theme)}
                                            >
                                                {{
                                                    checked: () => (
                                                        <Icon
                                                            size="14"
                                                            color="#ffd93b"
                                                            component={compute('CheckedOutlined')}
                                                        ></Icon>
                                                    ),
                                                    unchecked: () => (
                                                        <Icon
                                                            size="14"
                                                            color="#ffd93b"
                                                            component={compute('UnCheckedOutlined')}
                                                        ></Icon>
                                                    )
                                                }}
                                            </n-switch>
                                        )
                                    }}
                                </n-tooltip>
                            </div>
                            <div class={css['vnode-column']}>
                                <n-divider style={{ margin: '24px 0 10px' }}>系统主题</n-divider>
                                <n-grid cols={9} x-gap={4} y-gap={4}>
                                    {primaryVars.value.map((color, index) => (
                                        <n-grid-item key={index}>
                                            <div
                                                class={{ [css['color-scope']]: true }}
                                                style={{ background: color }}
                                                onClick={e => dvc.setPrimaryColor(color)}
                                            >
                                                {dvc.primaryColor === color && (
                                                    <Icon color="#ffffff" component={compute('CheckOutlined')}></Icon>
                                                )}
                                            </div>
                                        </n-grid-item>
                                    ))}
                                </n-grid>
                            </div>
                            <div class={css['vnode-column']}>
                                <n-divider style={{ margin: '24px 0 10px' }}>导航栏风格</n-divider>
                                <n-space size={15}>
                                    <div
                                        class={css['nav-style']}
                                        style={{ cursor: dvc.theme === 'dark' ? 'not-allowed' : 'pointer' }}
                                        onClick={e => dvc.theme !== 'dark' && dvc.setInverted('dark')}
                                    >
                                        <img src={loadFile('base/nav-theme-dark.png')} alt="" />
                                        {dvc.inverted === 'dark' && dvc.theme !== 'dark' && (
                                            <n-badge dot color="#19be6b" />
                                        )}
                                    </div>
                                    <div
                                        class={css['nav-style']}
                                        style={{ cursor: dvc.theme === 'dark' ? 'not-allowed' : 'pointer' }}
                                        onClick={e => dvc.theme !== 'dark' && dvc.setInverted('light')}
                                    >
                                        <img src={loadFile('base/nav-theme-light.png')} alt="" />
                                        {dvc.inverted === 'light' && dvc.theme !== 'dark' && (
                                            <n-badge dot color="#19be6b" />
                                        )}
                                    </div>
                                    <div
                                        class={css['nav-style']}
                                        style={{ cursor: 'pointer' }}
                                        onClick={e => dvc.setInverted('nav-dark')}
                                    >
                                        <img src={loadFile('base/all-theme-dark.png')} alt="" />
                                        {(dvc.theme === 'dark' || dvc.inverted === 'nav-dark') && (
                                            <n-badge dot color="#19be6b" />
                                        )}
                                    </div>
                                </n-space>
                            </div>
                            <div class={css['vnode-column']}>
                                <n-divider style={{ margin: '24px 0 10px' }}>界面显示</n-divider>
                                <n-space vertical size={16}>
                                    <div class={css['column-scope']}>
                                        <div style={{ flex: 1 }}>显示重载页面按钮</div>
                                        <n-switch value={dvc.reload} on-update:value={dvc.setReload}></n-switch>
                                    </div>
                                    <div class={css['column-scope']}>
                                        <div style={{ flex: 1 }}>显示面包屑导航</div>
                                        <n-switch value={dvc.breadcr} on-update:value={dvc.setBreadcr}></n-switch>
                                    </div>
                                    <div class={css['column-scope']}>
                                        <div style={{ flex: 1 }}>显示多页签</div>
                                        <n-switch value={dvc.better} on-update:value={dvc.setBetter}></n-switch>
                                    </div>
                                </n-space>
                            </div>
                            <div class={css['vnode-column']}>
                                <n-divider style={{ margin: '24px 0 10px' }}>动画</n-divider>
                                <n-space vertical size={16}>
                                    <div class={css['column-scope']}>
                                        <div style={{ flex: 1 }}>禁用动画</div>
                                        <n-switch value={dvc.transition} on-update:value={dvc.setTransition}></n-switch>
                                    </div>
                                    <div class={css['column-scope']}>
                                        <div style={{ flex: 1 }}>动画类型</div>
                                        <div style={{ flex: 1 }}>
                                            <n-select
                                                value={dvc.transitionName}
                                                disabled={dvc.transition}
                                                options={animate.value}
                                                on-update:value={dvc.setTransitionName}
                                            ></n-select>
                                        </div>
                                    </div>
                                </n-space>
                            </div>
                        </div>
                    </n-drawer-content>
                </n-drawer>
            )
        }
    })

    mounte().catch(e => {
        console.log(e)
    })
}
