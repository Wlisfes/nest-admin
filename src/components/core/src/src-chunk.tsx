import type { UploadFileInfo, FormInst, FormRules } from 'naive-ui'
import { onMounted, ref, computed } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useRxicon } from '@/hooks/hook-icon'
import { httpCreateOSS } from '@/api/service'
import { useOssModule } from '@/utils/utils-aliyun'
import { Observer } from '@/utils/utils-observer'
import { createComponent } from '@/utils/utils-app'

type IObserver = {}
export async function fetchChunk() {
    const observer = new Observer<IObserver>()
    const { el, mounte, unmount } = createComponent({
        name: 'FetchChunk',
        setup() {
            const formRef = ref<FormInst>()
            const rules: FormRules = {
                version: [{ required: true, type: 'number', message: '请输入资源版本号', trigger: 'blur' }],
                name: [{ required: true, message: '请上传资源文件', trigger: 'blur' }]
            }
            const { Icon, compute } = useRxicon()
            const { state, setState } = useState({
                visible: false,
                loading: false,
                version: null,
                name: ''
            })
            const style = computed(() => ({ margin: '100px auto auto', width: '95%', maxWidth: '640px' }))

            /**上传拦截**/
            const onBeforeUpload = async ({ file }: { file: UploadFileInfo }) => {
                // await setState({
                //     loading: true,
                //     name: file.name,
                //     cover: URL.createObjectURL(file.file as File)
                // })
                // await fetchUpload(file.file as File)
                console.log(file)
                return false
            }

            onMounted(() => setState({ visible: true }))

            return () => (
                <n-modal
                    v-model:show={state.visible}
                    closable={true}
                    auto-focus={false}
                    show-icon={false}
                    to={el}
                    style={style.value}
                    title="上传资源"
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
                            require-mark-placement="left"
                            label-width={85}
                            style={{ margin: '24px 0' }}
                        >
                            <n-form-item label="资源版本号" path="version">
                                <n-input-number v-model:value={state.version} placeholder="资源版本号"></n-input-number>
                            </n-form-item>
                            <n-form-item label="资源文件" path="name">
                                <n-upload
                                    accept=".js,.css,.html"
                                    default-upload={false}
                                    show-file-list={false}
                                    show-remove-button={false}
                                    disabled={state.loading}
                                    on-before-upload={onBeforeUpload}
                                >
                                    <n-button dashed style={{ width: '100px', height: '100px' }}>
                                        {{ icon: () => <Icon size={28} component={compute('FileAddOutlined')} /> }}
                                    </n-button>
                                </n-upload>
                            </n-form-item>
                        </n-form>
                    </n-spin>
                    <n-space justify="end">
                        <n-button onClick={() => setState({ visible: false })}>取消</n-button>
                        <n-button type="info" loading={state.loading}>
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

    return { observer }
}
