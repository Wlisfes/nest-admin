import { IProvider } from '@/interface/api/http-provider'

export type IPrimary = 'admin' | 'dev' | 'visitor' | 'super'
export interface IRole extends IProvider {
    id: number
    primary: string
    name: string
    status: number
    comment: string
    action: string[]
    list: Array<IRole>
}

export interface IUser extends IProvider {
    id: number
    uid: number
    account: number
    nickname: string
    email: string
    avatar: string
    comment: string
    mobile: number
    password: string
    status: number
    token: string
    role: Array<IRole>
    list: Array<IUser>
}
