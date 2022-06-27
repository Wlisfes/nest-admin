<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useDialog } from 'naive-ui'
import { useUserStore } from '@/store/modules/user-store'
import { Icons, useRxicon } from '@/hooks/hook-icon'
import { router } from '@/router'

type IOption = { label: string; key: string; icon: keyof typeof Icons; color: string }

export default defineComponent({
    name: 'BarUser',
    setup() {
        const { compute } = useRxicon()
        const user = useUserStore()
        const dialog = useDialog()
        const options = computed<Array<IOption>>(() => {
            if (user.uid) {
                return [
                    { label: '控制台', key: 'admin', icon: 'DashboardOutlined', color: '#1890ff' },
                    { label: '退出登录', key: 'logout', icon: 'LogoutOutlined', color: '#f5222d' }
                ]
            }
            return [{ label: '立即登录', key: 'login', icon: 'LoginOutlined', color: '#13c2c2' }]
        })

        /**退出登录**/
        const logout = () => {
            const e = dialog.warning({
                title: '确定要退出吗？',
                positiveText: '退出登录',
                negativeText: '在看看',
                negativeButtonProps: { type: 'info', size: 'medium', ghost: false },
                positiveButtonProps: { type: 'error', size: 'medium' },
                style: {
                    minHeight: '160px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    margin: '100px auto auto'
                },
                closable: false,
                onPositiveClick: () => {
                    return new Promise(resolve => {
                        e.loading = true
                        user.logout().finally(() => {
                            resolve(true)
                        })
                    })
                }
            })
        }

        const onSelecter = (key: string) => {
            if (key === 'login') {
                router.push('/login')
            } else if (key === 'admin') {
                router.push('/admin')
            } else {
                logout()
            }
        }

        return () => (
            <div class="app-user">
                <n-dropdown
                    options={options.value}
                    render-icon={(u: IOption) => <n-icon color={u.color} component={compute(u.icon)}></n-icon>}
                    render-label={(u: IOption) => <span style={{ color: u.color }}>{u.label}</span>}
                    show-arrow
                    trigger="click"
                    onSelect={onSelecter}
                >
                    <n-avatar round bordered={false} size={36} src={user.avatar} style={{ cursor: 'pointer' }}>
                        {!user.avatar && <n-icon size={20} component={compute('UserOutlined')}></n-icon>}
                    </n-avatar>
                </n-dropdown>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.app-user {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 9;
    padding: 0 12px;
    :deep(.n-avatar__text) {
        line-height: 1;
    }
}
</style>
