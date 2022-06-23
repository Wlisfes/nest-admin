<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { useCompute } from '@/hooks/hook-icon'

export default defineComponent({
    name: 'Register',
    setup() {
        const { compute } = useCompute()
        const loading = ref(false)
        const formRef = ref<FormInst>()
        const form = ref({ name: 'admin', password: '12345', code: '9527' })
        const rules: FormRules = {
            age: [{ required: true, message: '请输入账号' }],
            password: [{ required: true, message: '请输入密码' }],
            code: [{ required: true, message: '请输入验证码' }]
        }
        const onSubmit = async () => {
            try {
                const error = await formRef.value?.validate()
                if (!error) {
                }
            } catch (e) {}
        }

        return () => {
            return (
                <div>
                    <h2>注 册</h2>
                    <n-form ref={formRef} model={form.value} rules={rules} label-placement="left">
                        <n-form-item path="name">
                            <n-input v-model:value={form.value.name} size="large" placeholder="账号">
                                {{ prefix: () => <n-icon component={compute('UserOutlined')}></n-icon> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input
                                v-model:value={form.value.password}
                                size="large"
                                type="password"
                                show-password-on="mousedown"
                                placeholder="密码"
                            >
                                {{ prefix: () => <n-icon component={compute('LockOutlined')}></n-icon> }}
                            </n-input>
                        </n-form-item>
                        <n-form-item path="code">
                            <n-input v-model:value={form.value.code} size="large" placeholder="验证码">
                                {{ prefix: () => <n-icon component={compute('VerifiedOutlined')}></n-icon> }}
                            </n-input>
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
