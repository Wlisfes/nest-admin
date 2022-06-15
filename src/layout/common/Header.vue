<script lang="tsx">
import { defineComponent, computed, Fragment } from 'vue'
import { useAppStore } from '@/store/modules/app-store'
import { useDvcStore } from '@/store/modules/dvc-store'
import { useProvider } from '@/hooks/hook-provider'
import { Icons, useCompute } from '@/hooks/hook-icon'
import { delToken } from '@/utils/utils-cookie'
import { onReload, onEnter } from '@/router'
import { useAside } from '@/core/common/core-aside'
import { useSetup } from '@/core/common/core-setup'

type IOption = { label: string; key: string; icon: keyof typeof Icons; color: string }

export default defineComponent({
    name: 'Header',
    setup() {
        const { inverted } = useProvider()
        const { compute } = useCompute()
        const aside = useAside()
        const setup = useSetup()

        const app = useAppStore()
        const dvc = useDvcStore()
        const avatar = computed(() => {
            return 'https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg'
            // return new URL('/src/assets/resource/mini-logo.png', import.meta.url).href
        })

        const onTrigger = () => {
            if (app.device === 'MOBILE') {
                aside.init(true)
            } else {
                app.setCollapse(!app.collapse)
            }
        }

        const onSelecter = (key: string) => {
            if (key === 'logout') {
                delToken().finally(() => {
                    onEnter('/login')
                })
            }
        }

        return () => (
            <Fragment>
                <aside.Component />
                <setup.Component />

                <n-layout-header class="app-header" bordered inverted={inverted.value.header}>
                    <div class="vnode-trigger" onClick={onTrigger}>
                        <n-icon
                            size={20}
                            component={compute(app.collapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined')}
                        ></n-icon>
                    </div>
                    {dvc.reload && (
                        <div class="vnode-trigger" onClick={e => onReload()}>
                            <n-icon size={20} component={compute('ReloadOutlined')}></n-icon>
                        </div>
                    )}
                    <div style={{ flex: 1 }}></div>
                    <div class="vnode-trigger">
                        <n-icon size={20} component={compute('SearchOutlined')}></n-icon>
                    </div>
                    <div class="vnode-trigger">
                        <n-icon size={20} component={compute('GithubOutlined')}></n-icon>
                    </div>
                    <n-popover trigger="click" style={{ maxWidth: '200px' }} placement="bottom">
                        {{
                            trigger: () => (
                                <div class="vnode-trigger">
                                    <n-icon size={22} component={compute('BellOutlined')}></n-icon>
                                </div>
                            ),
                            default: () => (
                                <div>
                                    {[1, 2, 3].map(key => (
                                        <div key={key} style={{ lineHeight: 1.7, fontSize: '16px', cursor: 'pointer' }}>
                                            <n-icon component={compute('SoundOutlined')}></n-icon>
                                            <span style={{ marginLeft: '10px' }}>这是一条新消息！</span>
                                        </div>
                                    ))}
                                </div>
                            )
                        }}
                    </n-popover>
                    <n-dropdown
                        options={[
                            { label: '返回首页', key: 'home', icon: 'BankOutlined', color: '#13c2c2' },
                            { label: '个人中心', key: 'user', icon: 'UserOutlined', color: '#1890ff' },
                            { label: '退出登录', key: 'logout', icon: 'LogoutOutlined', color: '#f5222d' }
                        ]}
                        render-icon={(u: IOption) => <n-icon component={compute(u.icon)} color={u.color}></n-icon>}
                        render-label={(u: IOption) => <span style={{ color: u.color }}>{u.label}</span>}
                        show-arrow
                        trigger="click"
                        onSelect={onSelecter}
                    >
                        {{
                            default: () => (
                                <div class="vnode-trigger">
                                    <n-avatar round size={36} src={avatar.value} />
                                </div>
                            )
                        }}
                    </n-dropdown>
                    <div class="vnode-trigger" onClick={() => setup.init(true)}>
                        <n-icon size={20} component={compute('SettingOutlined')}></n-icon>
                    </div>
                </n-layout-header>
            </Fragment>
        )
    }
})
</script>
<style lang="scss" scoped>
.app-header {
    height: 60px;
    padding: 0 20px 0 10px;
    display: flex;
    .vnode-trigger {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        padding: 0 10px;
    }
}
</style>
