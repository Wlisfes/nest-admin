<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useDialog } from 'naive-ui'
import { useUserStore } from '@/store/modules/user-store'
import { onEnter } from '@/router'

type IOption = { label: string; key: string; icon: string; color: string }

export default defineComponent({
    name: 'BarUser',
    setup() {
        const user = useUserStore()
        const dialog = useDialog()
        const options = computed<Array<IOption>>(() => {
            if (user.uid) {
                return [
                    { label: '控制台', key: 'admin', icon: 'antd-dashboard', color: '#1890ff' },
                    { label: '退出登录', key: 'logout', icon: 'antd-logout', color: '#f5222d' }
                ]
            }
            return [{ label: '立即登录', key: 'login', icon: 'antd-login', color: '#13c2c2' }]
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
                onEnter('/login')
            } else if (key === 'admin') {
                onEnter('/admin')
            } else {
                logout()
            }
        }

        return () => (
            <div class="app-user">
                <n-dropdown
                    options={options.value}
                    render-icon={(u: IOption) => <u-icon name={u.icon} color={u.color} style={{ zIndex: 9 }}></u-icon>}
                    render-label={(u: IOption) => <span style={{ color: u.color }}>{u.label}</span>}
                    show-arrow
                    trigger="click"
                    onSelect={onSelecter}
                >
                    <n-avatar round bordered={false} size={36} src={user.avatar} style={{ cursor: 'pointer' }}>
                        {!user.avatar && <u-icon name="antd-user"></u-icon>}
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
