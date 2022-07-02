import { onMounted } from 'vue'
import { NModal, NSpace, NButton, NForm, NFormItem, NInput } from 'naive-ui'
import { useForm } from '@/hooks/hook-form'
import { useCompute } from '@/hooks/hook-compute'
import { useRxicon } from '@/hooks/hook-icon'
import { createComponent } from '@/utils/utils-app'

export const onResetUser = () => {
    const { el, mounte, unmount } = createComponent({
        setup() {
            const { Icon, compute } = useRxicon()
            const { formRef, rules } = useCompute()
            const { state, setState } = useForm({
                visible: false,
                password: '',
                loading: false
            })

            const onSubmit = async () => {
                try {
                    await formRef.value?.validate()
                    await setState({ loading: true })
                } catch (e) {
                    setState({ loading: false })
                }
            }

            onMounted(() => {
                setState({ visible: true })
            })

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
                    <NForm ref={formRef} model={state} rules={rules.value} style={{ margin: '24px 0' }}>
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
                        <NButton type="info" onClick={onSubmit}>
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
