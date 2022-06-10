import type { IProvider, IRole } from '@/api/pipe'

export type IRoute = IProvider & {
    id: number
    type: number
    role: IRole[]
    name: string
    router: string
    path: string | undefined
    keepAlive: number
    status: number
    visible: number
    icon: string | null
    order: number | null
    parent: IRoute | null
    children: IRoute[]
}
