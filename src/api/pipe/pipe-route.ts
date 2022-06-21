import type { IProvider, IRole } from '@/api/pipe'

export type IRoute = IProvider & {
    id: number
    type: number
    role: IRole[]
    name: string
    title: string
    router: string
    path: string
    keepAlive: number
    status: number
    hidden: number
    icon: string
    order: number
    parent: IRoute
    children: IRoute[]
}
