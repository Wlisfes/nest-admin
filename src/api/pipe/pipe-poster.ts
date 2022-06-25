import type { IProvider, IUser } from '@/api/pipe'

export type IPoster = IProvider & {
    id: number
    type: number
    url: string
    path: string
    status: number
    user: IUser
    list: Array<IPoster>
}
