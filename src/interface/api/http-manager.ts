import { IProvider } from '@/interface/api/http-provider'
import { IUser } from '@/interface/api/http-system'

export interface ISource extends IProvider {
    id: number
    name: string
    color: string
    order: number
    comment: string
    list: Array<ISource>
}

export interface IArticle extends IProvider {
    id: number
    title: string
    cover: string
    content: string
    html: string
    description: string | null
    url: string
    status: number
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
