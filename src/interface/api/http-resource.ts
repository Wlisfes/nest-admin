import { IProvider } from '@/interface/api/http-provider'
import { IUser } from '@/interface/api/http-system'

export interface IPoster extends IProvider {
    id: number
    path: string
    url: string
    type: number
    user: IUser
    list: Array<IPoster>
}

export interface IChunk extends IProvider {
    id: number
    name: string
    path: string
    url: string
    version: number
    user: IUser
    list: Array<IChunk>
}
