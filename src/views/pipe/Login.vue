<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { onEnter } from '@/router'
import { useUserStore } from '@/store/modules/user-store'
import { useCompute } from '@/hooks/hook-icon'

export default defineComponent({
    name: 'Login',
    setup() {
        const { compute } = useCompute()
        const user = useUserStore()
        const vcCode = ref<HTMLImageElement>()
        const formRef = ref<FormInst>()
        const loading = ref(false)
        const form = ref({ account: '', password: '', code: '' })
        const rules: FormRules = {
            account: [{ required: true, message: '请输入账号', trigger: 'change' }],
            password: [
                { required: true, message: '请输入密码', trigger: 'change' },
                { min: 6, message: '密码不能少于6位', trigger: 'change' }
            ],
            code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
        }

        const onReloadCursor = () => {
            if (vcCode.value) {
                vcCode.value.src = `${import.meta.env.VITE_API_BASE}/api/user/code?t=${Date.now()}`
            }
        }

        const onSubmit = async () => {
            try {
                const error = await formRef.value?.validate()
                if (!error) {
                    loading.value = true
                    await user.login({ ...form.value })
                    onEnter('/')
                }
            } catch (e) {
                loading.value = false
            }
        }

        return () => {
            return (
                <div>
                    <h2 class="app-compute__form-title">登 录</h2>
                    <n-form ref={formRef} model={form.value} rules={rules} label-placement="left">
                        <n-form-item path="account">
                            <n-input
                                v-model:value={form.value.account}
                                size="large"
                                placeholder="账号"
                                input-props={{ autocomplete: 'off' }}
                            >
                                {{ prefix: () => <n-icon component={compute('UserOutlined')}></n-icon> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input
                                v-model:value={form.value.password}
                                maxlength={16}
                                size="large"
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
                                v-model:value={form.value.code}
                                size="large"
                                maxlength={4}
                                placeholder="验证码"
                                input-props={{ autocomplete: 'off' }}
                            >
                                {{ prefix: () => <n-icon component={compute('VerifiedOutlined')}></n-icon> }}
                            </n-input>
                            <img
                                class="vc-code"
                                ref={vcCode}
                                src={`${import.meta.env.VITE_API_BASE}/api/user/code`}
                                onClick={onReloadCursor}
                            />
                        </n-form-item>
                        <n-form-item>
                            <n-button
                                class="antd-submit"
                                type="info"
                                size="large"
                                round
                                loading={loading.value}
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
