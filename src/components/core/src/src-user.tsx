import type { IRole, IUser } from '@/api/pipe'
import type { FormRules, FormInst } from 'naive-ui'
import { onMounted, computed, ref } from 'vue'
import { httpUpdatePwsUser, httpOneUser, httpUpdateUser } from '@/api/service'
import { useState } from '@/hooks/hook-state'
import { useRxicon } from '@/hooks/hook-icon'
import { createComponent } from '@/utils/utils-app'

export const fetchResetUser = ({ uid }: IUser, handler?: (e: IUser) => void) => {
    const { el, mounte, unmount } = createComponent({
        name: 'FetchResetUser',
        setup() {
            const { Icon, compute } = useRxicon()
            const { state, setState } = useState({ visible: false, password: '', loading: false })
            const formRef = ref<FormInst>()
            const rules: FormRules = {
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                    { min: 6, message: '密码不能少于6位', trigger: 'change' }
                ]
            }

            onMounted(() => setState({ visible: true }))

            const onSubmit = async () => {
                try {
                    await formRef.value?.validate()
                    await setState({ loading: true })
                    const { data } = await httpUpdatePwsUser({ uid, password: state.password })
                    setState({ visible: false, loading: false }).then(() => {
                        handler?.(data)
                    })
                } catch (e) {
                    setState({ loading: false })
                }
            }

            return () => (
                <n-modal
                    v-model:show={state.visible}
                    closable={true}
                    auto-focus={false}
                    to={el}
                    transform-origin="center"
                    title="重置密码"
                    preset="dialog"
                    style={{ margin: '100px auto auto' }}
                    onAfterLeave={unmount}
                >
                    <n-form
                        ref={formRef}
                        model={state}
                        rules={rules}
                        disabled={state.loading}
                        style={{ margin: '24px 0' }}
                    >
                        <n-form-item label="密码" path="password">
                            <n-input
                                v-model:value={state.password}
                                size="medium"
                                type="password"
                                placeholder="密码"
                                show-password-on="mousedown"
                                input-props={{ autocomplete: 'new-password' }}
                            >
                                {{ prefix: () => <Icon component={compute('LockOutlined')} /> }}
                            </n-input>
                        </n-form-item>
                    </n-form>
                    <n-space justify="end">
                        <n-button onClick={() => setState({ visible: false })}>取消</n-button>
                        <n-button type="info" loading={state.loading} onClick={onSubmit}>
                            确定
                        </n-button>
                    </n-space>
                </n-modal>
            )
        }
    })

    //挂载组件
    mounte().catch(e => {
        console.log(e)
    })
}

type IUserForm = {
    nickname: string
    password: string
    avatar: string
    account: string | number
    email: string
    role: Array<number>
    mobile: string
    comment: string
    status: number
    loading: boolean
    visible: boolean
}
type IFetchUser = {
    key: 'create' | 'edit'
    roles: Array<IRole>
    uid?: number | null
}
export const fetchUser = ({ key, roles, uid }: IFetchUser, handler?: (e: IUser) => void) => {
    const { el, mounte, unmount } = createComponent({
        name: 'FetchUser',
        setup() {
            const formRef = ref<FormInst>()
            const rules: FormRules = {
                nickname: [{ required: true, message: '请输入角色昵称', trigger: 'blur' }],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                    { min: 6, message: '密码不能少于6位', trigger: 'change' }
                ],
                role: [{ required: true, type: 'array', message: '请选择角色', trigger: 'blur' }],
                status: [{ required: true, type: 'number', message: '请选择状态', trigger: 'blur' }]
            }
            const { state, setState } = useState<IUserForm>({
                nickname: '',
                password: '',
                avatar: '',
                account: '',
                email: '',
                role: [],
                mobile: '',
                status: 1,
                comment: '',
                visible: false,
                loading: false
            })
            const style = computed(() => ({ margin: '100px auto auto', width: '95%', maxWidth: '880px' }))
            const title = computed(() => (key === 'create' ? '新增用户' : '编辑用户'))

            /**用户信息**/
            const fetchOneUser = () => {
                setState({ loading: true }).then(async () => {
                    try {
                        const { data } = await httpOneUser({ uid: uid as number })
                        setState({
                            avatar: data.avatar ?? '',
                            nickname: data.nickname ?? '',
                            email: data.email ?? '',
                            account: String(data.account ?? ''),
                            mobile: String(data.mobile ?? ''),
                            comment: data.comment ?? '',
                            role: data.role.map(x => x.id),
                            status: data.status,
                            loading: false
                        })
                    } catch (e) {
                        setState({ loading: false })
                    }
                })
            }

            onMounted(() => {
                setState({ visible: true }).then(() => {
                    if (key === 'edit') {
                        fetchOneUser()
                    }
                })
            })

            const onSubmit = async () => {
                try {
                    await formRef.value?.validate()
                    await setState({ loading: true })
                    if (key === 'create') {
                    } else {
                        const { nickname, status, role, email, avatar, mobile, comment } = state
                        const { data } = await httpUpdateUser({
                            uid: uid as number,
                            mobile,
                            nickname,
                            status,
                            role,
                            email,
                            avatar,
                            comment
                        })
                        setState({ visible: false, loading: false }).then(() => {
                            handler?.(data)
                        })
                    }
                } catch (e) {
                    setState({ loading: false })
                }
            }

            return () => (
                <n-modal
                    v-model:show={state.visible}
                    closable={true}
                    auto-focus={false}
                    show-icon={false}
                    to={el}
                    style={style.value}
                    title={title.value}
                    transform-origin="center"
                    preset="dialog"
                    onAfterLeave={unmount}
                >
                    <n-spin show={state.loading}>
                        <n-form
                            ref={formRef}
                            model={state}
                            rules={rules}
                            disabled={state.loading}
                            label-placement="left"
                            label-width={85}
                            style={{ margin: '24px 0' }}
                        >
                            <n-form-item label="头像">
                                <u-scale max-width={100} scale={1}>
                                    <u-avatar
                                        src={state.avatar}
                                        username={state.nickname}
                                        size={100}
                                        round={6}
                                    ></u-avatar>
                                </u-scale>
                            </n-form-item>
                            <n-grid cols={2} item-responsive>
                                <n-grid-item span="0:2 540:1 880:1">
                                    <n-form-item label="昵称" path="nickname">
                                        <n-input v-model:value={state.nickname} placeholder="昵称"></n-input>
                                    </n-form-item>
                                </n-grid-item>
                                <n-grid-item span="0:2 540:1 880:1">
                                    <n-form-item label="账号" path="account">
                                        <n-input v-model:value={state.account} disabled placeholder="账号"></n-input>
                                    </n-form-item>
                                </n-grid-item>
                            </n-grid>
                            <n-grid cols={2} item-responsive>
                                <n-grid-item span="0:2 540:1 880:1">
                                    <n-form-item label="邮箱">
                                        <n-input v-model:value={state.email} placeholder="邮箱"></n-input>
                                    </n-form-item>
                                </n-grid-item>
                                <n-grid-item span="0:2 540:1 880:1">
                                    <n-form-item label="手机号">
                                        <n-input v-model:value={state.mobile} placeholder="手机号"></n-input>
                                    </n-form-item>
                                </n-grid-item>
                            </n-grid>
                            <n-grid cols={2} item-responsive>
                                <n-grid-item span="0:2 540:1 880:1">
                                    <n-form-item label="角色" path="role">
                                        <n-select
                                            v-model:value={state.role}
                                            clearable
                                            multiple
                                            max-tag-count={2}
                                            options={roles.map(x => ({ id: x.id, label: x.name, value: x.id }))}
                                            placeholder="用户角色"
                                        ></n-select>
                                    </n-form-item>
                                </n-grid-item>
                            </n-grid>
                            <n-form-item label="备注">
                                <n-input type="textarea" placeholder="可以清除" clearable></n-input>
                            </n-form-item>
                            <n-form-item label="状态" required>
                                <n-radio-group v-model:value={state.status}>
                                    <n-space>
                                        <n-radio value={1}>启用</n-radio>
                                        <n-radio value={0}>禁用</n-radio>
                                    </n-space>
                                </n-radio-group>
                            </n-form-item>
                        </n-form>
                    </n-spin>
                    <n-space justify="end">
                        <n-button onClick={() => setState({ visible: false })}>取消</n-button>
                        <n-button type="info" loading={state.loading} onClick={onSubmit}>
                            确定
                        </n-button>
                    </n-space>
                </n-modal>
            )
        }
    })

    mounte().catch(e => {
        console.log(e)
    })
}
