import type { IProvider, IRole } from '@/api/pipe'

export type IUser = IProvider & {
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
    role: Array<IRole>
    list: Array<IUser>
}
