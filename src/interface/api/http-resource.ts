import { IProvider } from '@/interface/api/http-provider'
import { IUser } from '@/interface/api/http-system'

export interface IPoster extends IProvider {
    id: number
    path: string
    url: string
    type: number
    user: IUser
}
