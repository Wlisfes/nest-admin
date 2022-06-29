<script lang="tsx">
import { defineComponent } from 'vue'
import { useRxicon } from '@/hooks/hook-icon'
import { useCompute } from '@/hooks/hook-compute'
import { router } from '@/router'

export default defineComponent({
    name: 'Register',
    setup() {
        const { compute } = useRxicon()
        const { formRef, rules, state, isEmail, setState, startDuration, register } = useCompute()

        const fetchEmail = () => {
            setState({ sending: true }).then(() => {
                setTimeout(() => {
                    setState({ sending: false }).then(() => startDuration(60))
                }, 3000)
            })
        }

        const onSubmit = async () => {
            try {
                await formRef.value?.validate()
                await setState({ loading: true })
                await register({
                    nickname: state.nickname,
                    password: state.password,
                    email: state.email,
                    code: state.code
                }).then(() => {
                    router.replace('/')
                })
            } catch (e) {
                setState({ loading: false })
            }
        }

        return () => {
            return (
                <div>
                    <h2>注 册</h2>
                    <n-form ref={formRef} model={state} rules={rules.value} label-placement="left">
                        <n-form-item path="nickname">
                            <n-input v-model:value={state.nickname} size="medium" placeholder="用户昵称">
                                {{ prefix: () => <n-icon component={compute('UserOutlined')}></n-icon> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input
                                v-model:value={state.password}
                                size="medium"
                                type="password"
                                show-password-on="mousedown"
                                placeholder="密码"
                            >
                                {{ prefix: () => <n-icon component={compute('LockOutlined')}></n-icon> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="email">
                            <n-input v-model:value={state.email} size="medium" placeholder="邮箱">
                                {{ prefix: () => <n-icon component={compute('MailOutlined')}></n-icon> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="code">
                            <n-input
                                v-model:value={state.code}
                                size="medium"
                                maxlength={4}
                                placeholder="验证码"
                                input-props={{ autocomplete: 'off' }}
                            >
                                {{ prefix: () => <n-icon component={compute('VerifiedOutlined')}></n-icon> }}
                            </n-input>
                            <n-button
                                size="medium"
                                class="naive-customize"
                                ghost
                                style={{ marginLeft: '10px' }}
                                disabled={!isEmail.value || state.duration > 0}
                                loading={state.sending}
                                onClick={fetchEmail}
                            >
                                {{ default: () => (state.duration > 0 ? `${state.duration}秒后重试` : '发送验证码') }}
                            </n-button>
                        </n-form-item>
                        <n-form-item show-feedback={false}>
                            <n-button
                                class="antd-submit"
                                type="info"
                                size="medium"
                                round
                                loading={state.loading}
                                onClick={onSubmit}
                            >
                                提 交
                            </n-button>
                        </n-form-item>
                    </n-form>
                </div>
            )
        }
    }
})
</script>
