import { IProvider } from '@/interface/api/http-provider'
import { IUser } from '@/interface/api/http-system'

export interface ISource extends IProvider {
    id: number
    icon: string
    name: string
    color: string
    order: number
    comment: string
    list: Array<ISource>
}

export interface IRecord extends IProvider {
    id: number
    name: string
    cover: string
    order: number
    npm: string
    url: string
    github: string
    description: string
    source: Array<ISource>
    user: IUser
    list: Array<IRecord>
}

export interface IArticle extends IProvider {
    id: number
    title: string
    cover: string
    content: string
    html: string
    description: string | null
    url: string
    order: number
    browse: number
    comment: number
    star: {
        total: number
        where: boolean
    }
    source: Array<ISource>
    list: Array<IArticle>
    user: IUser
}
