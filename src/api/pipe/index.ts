export * from './pipe-common'
export * from './pipe-user'
export * from './pipe-cloud'
export * from './pipe-aliyun'
export * from './pipe-partner'
export * from './pipe-poster'
export * from './pipe-minute'
export * from './pipe-source'
export * from './pipe-article'
export * from './pipe-role'
export * from './pipe-route'
export * from './pipe-chunk'
import { IProvider } from './pipe-common'
import { IUser } from './pipe-user'

export type ILogger = IProvider & {
    id: number
    referer: string
    ip: string
    path: string
    method: string
    type: number
    body: Object
    query: Object
    params: Object
    code: number
    message: string
    status: number
    user: IUser
    list: Array<ILogger>
}
