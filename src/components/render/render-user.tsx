import type { IRole, IUser } from '@/api/pipe'
import type { FormRules, FormInst } from 'naive-ui'
import {
    NModal,
    NSpace,
    NButton,
    NForm,
    NFormItem,
    NInput,
    NSpin,
    NGrid,
    NGridItem,
    NSelect,
    NRadioGroup,
    NRadio
} from 'naive-ui'
import { onMounted, computed, ref } from 'vue'
import { UScale, UAvatar } from '@/components/global'
import { httpUpdatePwsUser, httpOneUser, httpUpdateUser } from '@/api/service'
import { useForm } from '@/hooks/hook-form'
import { useCompute } from '@/hooks/hook-compute'
import { useRxicon } from '@/hooks/hook-icon'
import { createComponent } from '@/utils/utils-app'

export const fetchResetUser = ({ uid }: IUser, handler?: (e: IUser) => void) => {
    const { el, mounte, unmount } = createComponent({
        setup() {
            const { Icon, compute } = useRxicon()
            const { formRef, rules } = useCompute()
            const { state, setState } = useForm({
                visible: false,
                password: '',
                loading: false
            })

            onMounted(() => setState({ visible: true }))

            const onSubmit = () => {
                formRef.value?.validate(error => {
                    if (!error) {
                        setState({ loading: true }).then(async () => {
                            try {
                                const { data } = await httpUpdatePwsUser({ uid, password: state.password })
                                setState({ visible: false, loading: false }).then(() => {
                                    handler?.(data)
                                })
                            } catch (e) {
                                setState({ loading: false })
                            }
                        })
                    }
                })
            }

            return () => (
                <NModal
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
                    <NForm
                        ref={formRef}
                        model={state}
                        rules={rules.value}
                        disabled={state.loading}
                        style={{ margin: '24px 0' }}
                    >
                        <NFormItem label="密码" path="password">
                            <NInput
                                v-model:value={state.password}
                                size="medium"
                                type="password"
                                placeholder="密码"
                                show-password-on="mousedown"
                                input-props={{ autocomplete: 'new-password' }}
                            >
                                {{ prefix: () => <Icon component={compute('LockOutlined')} /> }}
                            </NInput>
                        </NFormItem>
                    </NForm>
                    <NSpace justify="end">
                        <NButton onClick={() => setState({ visible: false })}>取消</NButton>
                        <NButton type="info" loading={state.loading} onClick={onSubmit}>
                            确定
                        </NButton>
                    </NSpace>
                </NModal>
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
}
export const fetchUser = (
    { key, roles, uid }: { key: 'create' | 'edit'; roles: Array<IRole>; uid?: number | null },
    handler?: (e: IUser) => void
) => {
    const { el, mounte, unmount } = createComponent({
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
            const { state, setState } = useForm<IUserForm>({
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
                <NModal
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
                    <NSpin show={state.loading}>
                        <NForm
                            ref={formRef}
                            model={state}
                            rules={rules}
                            disabled={state.loading}
                            label-placement="left"
                            label-width={85}
                            style={{ margin: '24px 0' }}
                        >
                            <NFormItem label="头像">
                                <UScale max-width={100} scale={1}>
                                    <UAvatar
                                        src={state.avatar}
                                        username={state.nickname}
                                        size={100}
                                        round={6}
                                    ></UAvatar>
                                </UScale>
                            </NFormItem>
                            <NGrid cols={2}>
                                <NGridItem span="580:1 1080:2">
                                    <NFormItem label="昵称" path="nickname">
                                        <NInput v-model:value={state.nickname} placeholder="昵称"></NInput>
                                    </NFormItem>
                                </NGridItem>
                                <NGridItem span="580:1 1080:2">
                                    <NFormItem label="账号" path="account">
                                        <NInput v-model:value={state.account} disabled placeholder="账号"></NInput>
                                    </NFormItem>
                                </NGridItem>
                            </NGrid>
                            <NGrid cols={2}>
                                <NGridItem>
                                    <NFormItem label="邮箱">
                                        <NInput v-model:value={state.email} placeholder="邮箱"></NInput>
                                    </NFormItem>
                                </NGridItem>
                                <NGridItem>
                                    <NFormItem label="手机号">
                                        <NInput v-model:value={state.mobile} placeholder="手机号"></NInput>
                                    </NFormItem>
                                </NGridItem>
                            </NGrid>
                            <NGrid cols={2}>
                                <NGridItem>
                                    <NFormItem label="角色" path="role">
                                        <NSelect
                                            v-model:value={state.role}
                                            clearable
                                            multiple
                                            max-tag-count={2}
                                            options={roles.map(x => ({ id: x.id, label: x.name, value: x.id }))}
                                            placeholder="用户角色"
                                        ></NSelect>
                                    </NFormItem>
                                </NGridItem>
                            </NGrid>
                            <NFormItem label="备注">
                                <NInput type="textarea" placeholder="可以清除" clearable></NInput>
                            </NFormItem>
                            <NFormItem label="状态" required>
                                <NRadioGroup v-model:value={state.status}>
                                    <NSpace>
                                        <NRadio value={1}>启用</NRadio>
                                        <NRadio value={0}>禁用</NRadio>
                                    </NSpace>
                                </NRadioGroup>
                            </NFormItem>
                        </NForm>
                    </NSpin>
                    <NSpace justify="end">
                        <NButton onClick={() => setState({ visible: false })}>取消</NButton>
                        <NButton type="info" loading={state.loading} onClick={onSubmit}>
                            确定
                        </NButton>
                    </NSpace>
                </NModal>
            )
        }
    })

    mounte().catch(e => {
        console.log(e)
    })
}
