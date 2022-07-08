import type { UploadFileInfo } from 'naive-ui'
import { onMounted, ref, computed } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useRxicon } from '@/hooks/hook-icon'
import { createComponent } from '@/utils/utils-app'
import Cropper from 'cropperjs'
import css from '@/components/core/scss/src-cropper.module.scss'
import 'cropperjs/dist/cropper.min.css'

type ICropper = {
    cover?: string
}

export function fetchCropper(props?: ICropper) {
    const { el, mounte, unmount } = createComponent({
        name: 'FetchCropper',
        setup() {
            const { Icon, compute } = useRxicon()
            const { state, setState } = useState({
                cover: props?.cover ?? '',
                visible: false,
                loading: false
            })
            const instance = ref<Cropper>()
            const imageRef = ref<HTMLImageElement>()
            const style = computed(() => ({ margin: '100px auto auto', width: '95%', maxWidth: '880px' }))

            /**初始化裁剪实例**/
            const initCropper = async () => {
                if (!instance.value && state.cover) {
                    instance.value = new Cropper(imageRef.value as HTMLImageElement, {
                        aspectRatio: 1,
                        initialAspectRatio: 1,
                        viewMode: 1,
                        dragMode: 'move',
                        ready: () => setState({ loading: false })
                    })
                }
                return instance.value
            }

            /**上传拦截**/
            const onBeforeUpload = async ({ file }: { file: UploadFileInfo }) => {
                await setState({
                    loading: true,
                    cover: URL.createObjectURL(file.file as File)
                })
                await initCropper()
                return false
            }

            onMounted(() => {
                setState({ visible: true, loading: !!props?.cover }).then(() => {
                    initCropper()
                })
            })

            return () => (
                <n-modal
                    v-model:show={state.visible}
                    closable={true}
                    auto-focus={false}
                    show-icon={false}
                    to={el}
                    style={style.value}
                    title="图片上传"
                    transform-origin="center"
                    preset="dialog"
                    onAfterLeave={unmount}
                >
                    <n-spin show={state.loading}>
                        <u-scale class="cropper-bg" max-width={880} scale={16 / 9}>
                            {state.cover && <img ref={imageRef} class={css['scope-cover']} src={state.cover} />}
                        </u-scale>
                    </n-spin>
                    <n-space justify="end" style={{ marginTop: '24px' }}>
                        <n-button type="warning">
                            {{ icon: () => <Icon component={compute('DownloadOutlined')} /> }}
                        </n-button>
                        <n-button type="info">
                            {{ icon: () => <Icon component={compute('ScissorOutlined')} /> }}
                        </n-button>
                        <n-upload
                            accept="image/jpeg,image/png,image/jpg"
                            default-upload={false}
                            show-file-list={false}
                            show-remove-button={false}
                            on-before-upload={onBeforeUpload}
                        >
                            <n-button type="success">
                                {{ icon: () => <Icon component={compute('UploadOutlined')} /> }}
                            </n-button>
                        </n-upload>
                        <n-button onClick={() => setState({ visible: false })}>取消</n-button>
                        <n-button type="info" disabled={state.loading}>
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
