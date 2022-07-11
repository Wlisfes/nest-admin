import type { IProvider, IUser } from '@/api/pipe'

export type IChunk = IProvider & {
    id: number
    url: string
    path: string
    name: string
    version: number
    status: number
    user: IUser
}
