import OSS from 'ali-oss'
import { moment } from '@/utils/utils-tool'

export interface OssOption {
    accessKeyId: string
    accessKeySecret: string
    stsToken: string
    region?: string
    bucket?: string
    refreshSTSToken?: () => Promise<OssOption>
    refreshSTSTokenInterval?: number
}
export function useOssModule(option: OssOption) {
    const client = new OSS({
        region: option.region || 'oss-cn-shenzhen',
        bucket: option.bucket || 'linvc',
        accessKeyId: option.accessKeyId,
        accessKeySecret: option.accessKeySecret,
        stsToken: option.stsToken,
        secure: true,
        refreshSTSTokenInterval: option.refreshSTSTokenInterval || 300000
    })

    const suffix = (fileName: string, def: string = 'jpg'): string => {
        return fileName.split('.').pop()?.toLowerCase() || def
    }

    const fileRename = (fileName: string): string => {
        return `${moment().format('YYYY-MM-DD')}/${Date.now()}.${suffix(fileName)}`
    }

    const upload = ({ file, name }: { file: File; name: string }): Promise<OSS.PutObjectResult> => {
        return new Promise(async (resolve, reject) => {
            try {
                const key = fileRename(name || file.name)
                const response = await client.put(key, file)
                resolve(response)
            } catch (e) {
                reject(e)
            }
        })
    }

    return { client, fileRename, upload }
}

export interface OnDemanOption {
    title: string
    fileName: string
    transfer: string
    /**添加文件成功回调**/
    addFileSuccess?: (props: any) => void
    /**开始上传**/
    onUploadstarted?: (props: any) => void
    /**文件上传成功**/
    onUploadSucceed?: (props: any) => void
    /**文件上传失败**/
    onUploadFailed?: (props: any, code?: number, message?: string) => void
    /**取消文件上传**/
    onUploadCanceled?: (props: any, code?: number, message?: string) => void
    /**文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上**/
    onUploadProgress?: (uploadInfo: any, totalSize?: any, progress?: any) => void
    /**上传凭证超时**/
    onUploadTokenExpired?: (props: any) => void
    /**全部文件上传结束**/
    onUploadEnd?: (props: any) => void
}
export function useOnDemanModule(option: OnDemanOption) {
    const client = new window.AliyunUpload.Vod({
        timeout: 60000,
        partSize: 1048576,
        parallel: 5,
        retryCount: 3,
        retryDuration: 2,
        region: 'cn-shanghai',
        userId: 1509113157031868,
        /**添加文件成功回调**/
        addFileSuccess: (props: any) => {
            option.addFileSuccess && option.addFileSuccess(props)
        },
        /**开始上传**/
        onUploadstarted: (props: any) => {
            if (props.videoId) {
                // nodeRefreshAliyunUpload({
                // 	VideoId: props.videoId
                // })
                // 	.then(({ code, data }) => {
                // 		if (code === HttpStatus.OK) {
                // 			const { UploadAuth, UploadAddress, VideoId } = data
                // 			client.setUploadAuthAndAddress(props, UploadAuth, UploadAddress, VideoId)
                // 		}
                // 	})
                // 	.catch(e => {
                // 		option.onUploadFailed && option.onUploadFailed(props, 400, e)
                // 	})
            } else {
                option.onUploadstarted && option.onUploadstarted(props)
                // nodeCreateAliyunUpload({
                // 	Title: this.title,
                // 	FileName: this.fileName,
                // 	TemplateGroupId: this.transfer
                // })
                // 	.then(({ code, data }) => {
                // 		if (code === HttpStatus.OK) {
                // 			const { UploadAuth, UploadAddress, VideoId } = data
                // 			client.setUploadAuthAndAddress(props, UploadAuth, UploadAddress, VideoId)
                // 		}
                // 	})
                // 	.catch(e => {
                // 		option.onUploadFailed && option.onUploadFailed(props, 400, e)
                // 	})
            }
        },
        /**文件上传成功**/
        onUploadSucceed: (props: any) => {
            option.onUploadSucceed && option.onUploadSucceed(props)
        },
        /**文件上传失败**/
        onUploadFailed: (props: any, code: any, message: any) => {
            option.onUploadFailed && option.onUploadFailed(props, code, message)
        },
        /**取消文件上传**/
        onUploadCanceled: (props: any, code: any, message: any) => {
            option.onUploadCanceled && option.onUploadCanceled(props, code, message)
        },
        /**文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上**/
        onUploadProgress: (props: any, totalSize: any, progress: any) => {
            option.onUploadProgress && option.onUploadProgress(props, totalSize, Math.ceil(progress * 100))
        },
        /**上传凭证超时**/
        onUploadTokenExpired: (props: any) => {
            // nodeRefreshAliyunUpload({
            // 	VideoId: props.videoId
            // })
            // 	.then(({ code, data }) => {
            // 		if (code === HttpStatus.OK) {
            // 			client.resumeUploadWithAuth(data.UploadAuth)
            // 		}
            // 	})
            // 	.catch(e => {
            // 		option.onUploadFailed && option.onUploadFailed(props, 400, e)
            // 	})
        },
        /**全部文件上传结束**/
        onUploadEnd: (props: any) => {
            option.onUploadEnd && option.onUploadEnd(props)
        }
    })

    const addFile = (file: File) => {
        client.addFile(file)
    }

    const startUpload = () => client.startUpload()

    return { client, addFile, startUpload }
}
