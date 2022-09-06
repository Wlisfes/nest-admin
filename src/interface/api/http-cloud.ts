import { IProvider } from '@/interface/api/http-provider'
import { IUser } from '@/interface/api/http-system'

export interface ISource extends IProvider {
    id: number
    name: string
    color: string
    status: number
    order: number
    comment: string | null
    list: Array<ISource>
}

export interface ICloud extends IProvider {
    id: number
    type: number
    title: string
    key: string
    name: string
    path: string
    cover: string
    status: number
    order: number
    size: number
    browse: number
    comment: number
    star: { total: number; where: boolean }
    description: string
    parent: ICloud
    user: IUser
    source: Array<ISource>
    children: Array<ICloud>
    list: Array<ICloud>
}
