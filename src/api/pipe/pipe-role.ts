import type { IProvider } from '@/api/pipe'

export type IRole = IProvider & {
    id: number
    primary: string
    name: string
    status: number
    comment: string
    action: string[]
}
