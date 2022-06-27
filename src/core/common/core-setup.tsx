import { defineComponent, ref, computed } from 'vue'
import {
    NDrawer,
    NDrawerContent,
    NDivider,
    NTooltip,
    NSwitch,
    NIcon,
    NGrid,
    NGridItem,
    NSpace,
    NBadge,
    NSelect
} from 'naive-ui'
import { useDvcStore } from '@/store/modules/dvc-store'
import { useProvider } from '@/hooks/hook-provider'
import { useRxicon } from '@/hooks/hook-icon'
import { loadFile } from '@/utils/utils-tool'
import { CoreNode } from '@/core/pipe/pipe-type'
import css from '@/core/scss/core-setup.module.scss'

export function useSetup(node?: CoreNode | null) {
    const visible = ref<boolean>(false)
    const init = (value: boolean) => {
        visible.value = value
    }

    const Component = defineComponent({
        name: 'Core-Setup',
        emits: ['close'],
        setup(props, { emit }) {
            const { compute } = useRxicon()
            const { primaryVars, animate } = useProvider()
            const dvc = useDvcStore()
            const to = computed<string | HTMLElement>(() => node?.to || document.body)
            const onClose = () => emit('close', false)

            return () => (
                <NDrawer
                    to={to.value}
                    v-model:show={visible.value}
                    width={280}
                    placement="right"
                    on-after-leave={onClose}
                >
                    <NDrawerContent title="项目配置" native-scrollbar={false}>
                        <div class={css['setup-content']}>
                            <div class={css['vnode-column']}>
                                <NDivider style={{ margin: '10px 0' }}>主题</NDivider>
                                <NTooltip trigger="hover" placement="bottom">
                                    {{
                                        default: () => <span>{dvc.theme === 'dark' ? '浅色主题' : '深色主题'}</span>,
                                        trigger: () => (
                                            <NSwitch
                                                value={dvc.theme}
                                                checked-value="dark"
                                                unchecked-value="light"
                                                rail-style={() => ({ background: '#000e1c' })}
                                                on-update:value={(theme: 'dark' | 'light') => dvc.setTheme(theme)}
                                            >
                                                {{
                                                    checked: () => (
                                                        <NIcon
                                                            size="14"
                                                            color="#ffd93b"
                                                            component={compute('CheckedOutlined')}
                                                        ></NIcon>
                                                    ),
                                                    unchecked: () => (
                                                        <NIcon
                                                            size="14"
                                                            color="#ffd93b"
                                                            component={compute('UnCheckedOutlined')}
                                                        ></NIcon>
                                                    )
                                                }}
                                            </NSwitch>
                                        )
                                    }}
                                </NTooltip>
                            </div>
                            <div class={css['vnode-column']}>
                                <NDivider style={{ margin: '24px 0 10px' }}>系统主题</NDivider>
                                <NGrid cols={9} x-gap={4} y-gap={4}>
                                    {primaryVars.value.map((color, index) => (
                                        <NGridItem key={index}>
                                            <div
                                                class={{ [css['color-scope']]: true }}
                                                style={{ background: color }}
                                                onClick={e => dvc.setPrimaryColor(color)}
                                            >
                                                {dvc.primaryColor === color && (
                                                    <NIcon color="#ffffff" component={compute('CheckOutlined')}></NIcon>
                                                )}
                                            </div>
                                        </NGridItem>
                                    ))}
                                </NGrid>
                            </div>
                            <div class={css['vnode-column']}>
                                <NDivider style={{ margin: '24px 0 10px' }}>导航栏风格</NDivider>
                                <NSpace size={15}>
                                    <div
                                        class={css['nav-style']}
                                        style={{ cursor: dvc.theme === 'dark' ? 'not-allowed' : 'pointer' }}
                                        onClick={e => dvc.theme !== 'dark' && dvc.setInverted('dark')}
                                    >
                                        <img src={loadFile('base/nav-theme-dark.png')} alt="" />
                                        {dvc.inverted === 'dark' && dvc.theme !== 'dark' && (
                                            <NBadge dot color="#19be6b" />
                                        )}
                                    </div>
                                    <div
                                        class={css['nav-style']}
                                        style={{ cursor: dvc.theme === 'dark' ? 'not-allowed' : 'pointer' }}
                                        onClick={e => dvc.theme !== 'dark' && dvc.setInverted('light')}
                                    >
                                        <img src={loadFile('base/nav-theme-light.png')} alt="" />
                                        {dvc.inverted === 'light' && dvc.theme !== 'dark' && (
                                            <NBadge dot color="#19be6b" />
                                        )}
                                    </div>
                                    <div
                                        class={css['nav-style']}
                                        style={{ cursor: 'pointer' }}
                                        onClick={e => dvc.setInverted('nav-dark')}
                                    >
                                        <img src={loadFile('base/all-theme-dark.png')} alt="" />
                                        {(dvc.theme === 'dark' || dvc.inverted === 'nav-dark') && (
                                            <NBadge dot color="#19be6b" />
                                        )}
                                    </div>
                                </NSpace>
                            </div>
                            <div class={css['vnode-column']}>
                                <NDivider style={{ margin: '24px 0 10px' }}>界面显示</NDivider>
                                <NSpace vertical size={16}>
                                    <div class={css['column-scope']}>
                                        <div style={{ flex: 1 }}>显示重载页面按钮</div>
                                        <NSwitch value={dvc.reload} on-update:value={dvc.setReload}></NSwitch>
                                    </div>
                                    <div class={css['column-scope']}>
                                        <div style={{ flex: 1 }}>显示面包屑导航</div>
                                        <NSwitch value={dvc.breadcr} on-update:value={dvc.setBreadcr}></NSwitch>
                                    </div>
                                    <div class={css['column-scope']}>
                                        <div style={{ flex: 1 }}>显示多页签</div>
                                        <NSwitch value={dvc.better} on-update:value={dvc.setBetter}></NSwitch>
                                    </div>
                                </NSpace>
                            </div>
                            <div class={css['vnode-column']}>
                                <NDivider style={{ margin: '24px 0 10px' }}>动画</NDivider>
                                <NSpace vertical size={16}>
                                    <div class={css['column-scope']}>
                                        <div style={{ flex: 1 }}>禁用动画</div>
                                        <NSwitch value={dvc.transition} on-update:value={dvc.setTransition}></NSwitch>
                                    </div>
                                    <div class={css['column-scope']}>
                                        <div style={{ flex: 1 }}>动画类型</div>
                                        <div style={{ flex: 1 }}>
                                            <NSelect
                                                value={dvc.transitionName}
                                                disabled={dvc.transition}
                                                options={animate.value}
                                                on-update:value={dvc.setTransitionName}
                                            ></NSelect>
                                        </div>
                                    </div>
                                </NSpace>
                            </div>
                        </div>
                    </NDrawerContent>
                </NDrawer>
            )
        }
    })

    return { init, Component }
}
