<script lang="tsx">
import { defineComponent } from 'vue'
import { router } from '@/router'
import { useRxicon } from '@/hooks/hook-icon'
import { useCompute } from '@/hooks/hook-compute'

export default defineComponent({
    name: 'Login',
    setup() {
        const { compute } = useRxicon()
        const { codeURL, formRef, rules, state, setState, onRefresh, login } = useCompute()

        const onSubmit = async () => {
            try {
                await formRef.value?.validate()
                await setState({ loading: true })
                await login({
                    account: state.account,
                    password: state.password,
                    code: state.code
                }).then(() => {
                    router.replace('/')
                })
            } catch (e) {
                setState({ loading: false }).then(onRefresh)
            }
        }

        return () => {
            return (
                <div>
                    <h2>登 录</h2>
                    <n-form ref={formRef} model={state} rules={rules.value} label-placement="left">
                        <n-form-item path="account">
                            <n-input
                                v-model:value={state.account}
                                size="medium"
                                placeholder="账号"
                                input-props={{ autocomplete: 'off' }}
                            >
                                {{ prefix: () => <n-icon component={compute('UserOutlined')}></n-icon> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input
                                v-model:value={state.password}
                                maxlength={16}
                                size="medium"
                                type="password"
                                show-password-on="mousedown"
                                input-props={{ autocomplete: 'new-password' }}
                                placeholder="密码"
                            >
                                {{ prefix: () => <n-icon component={compute('LockOutlined')}></n-icon> }}
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
                            <img class="vc-code" src={codeURL.value} onClick={onRefresh} />
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
