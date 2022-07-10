import type { UploadFileInfo } from 'naive-ui'
import { onMounted, ref, computed } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useRxicon } from '@/hooks/hook-icon'
import { httpCreateOSS, httpCreatePoster } from '@/api/service'
import { useOssModule } from '@/utils/utils-aliyun'
import { Observer } from '@/utils/utils-observer'
import { createComponent } from '@/utils/utils-app'
import Cropper from 'cropperjs'
import css from '@/components/core/scss/src-cropper.module.scss'
import 'cropperjs/dist/cropper.min.css'

type TEnum = 1 | 2 | 3 | 4
type ICropper = { scale?: number; type?: TEnum; cover?: string }
type IObserver = {
    upload: { id: number; type: TEnum; name: string; url: string }
}

export async function fetchCropper(props?: ICropper) {
    const observer = new Observer<IObserver>()
    const { el, mounte, unmount } = createComponent({
        name: 'FetchCropper',
        setup() {
            const { Icon, compute } = useRxicon()
            const { state, setState } = useState({
                cover: props?.cover ?? '',
                name: props?.cover ?? '',
                visible: false,
                loading: false
            })
            const instance = ref<Cropper>()
            const imageRef = ref<HTMLImageElement>()
            const style = computed(() => ({ margin: '100px auto auto', width: '95%', maxWidth: '880px' }))

            /**初始化裁剪实例**/
            const initCropper = async () => {
                if (!instance.value && imageRef.value) {
                    instance.value = new Cropper(imageRef.value as HTMLImageElement, {
                        aspectRatio: props?.scale ?? 1,
                        initialAspectRatio: 1,
                        viewMode: 1,
                        dragMode: 'move',
                        ready: () => setState({ loading: false })
                    })
                } else if (instance.value) {
                    instance.value.replace(state.cover)
                }
                return instance.value
            }

            /**裁剪上传拦截**/
            const onCropperUpload = async ({ file }: { file: UploadFileInfo }) => {
                await setState({
                    loading: true,
                    name: file.name,
                    cover: URL.createObjectURL(file.file as File)
                })
                await initCropper()
                return false
            }

            /**即时上传拦截**/
            const onImmediateUpload = async ({ file }: { file: UploadFileInfo }) => {
                await setState({
                    loading: true,
                    name: file.name,
                    cover: URL.createObjectURL(file.file as File)
                })
                await fetchUpload(file.file as File)
                return false
            }

            /**上传OSS实例**/
            const fetchUpload = async (file: File) => {
                try {
                    const { data } = await httpCreateOSS()
                    const { upload } = useOssModule(data)
                    const response = await upload({ file, name: state.name })
                    const result = await httpCreatePoster({
                        type: props?.type ?? 1,
                        path: response.name,
                        url: `${data.path}/${response.name}`
                    })
                    setState({ visible: false }).then(() => {
                        observer.emit('upload', {
                            id: result.data.id,
                            type: props?.type ?? 1,
                            name: response.name,
                            url: `${data.path}/${response.name}`
                        })
                    })
                } catch (e) {
                    setState({ visible: false })
                }
            }

            /**确定裁剪上传**/
            const onSubmit = () => {
                setState({ loading: true }).then(() => {
                    instance.value?.getCroppedCanvas().toBlob(async blob => {
                        await fetchUpload(blob as File)
                    }, 'image/jpg')
                })
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
                        <n-button type="warning" disabled={state.loading}>
                            {{ icon: () => <Icon component={compute('DownloadOutlined')} /> }}
                        </n-button>
                        <n-upload
                            accept="image/jpeg,image/png,image/jpg"
                            default-upload={false}
                            show-file-list={false}
                            show-remove-button={false}
                            disabled={state.loading}
                            on-before-upload={onCropperUpload}
                        >
                            <n-button type="info">
                                {{ icon: () => <Icon component={compute('ScissorOutlined')} /> }}
                            </n-button>
                        </n-upload>
                        <n-upload
                            accept="image/jpeg,image/png,image/jpg"
                            default-upload={false}
                            show-file-list={false}
                            show-remove-button={false}
                            disabled={state.loading}
                            on-before-upload={onImmediateUpload}
                        >
                            <n-button type="success">
                                {{ icon: () => <Icon component={compute('UploadOutlined')} /> }}
                            </n-button>
                        </n-upload>
                        <n-button onClick={() => setState({ visible: false })}>取消</n-button>
                        <n-button
                            type="info"
                            loading={state.loading}
                            disabled={state.loading || !state.cover}
                            onClick={onSubmit}
                        >
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
