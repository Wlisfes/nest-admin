import type { AxiosStatic } from 'axios'

export interface AResponse {
    timestamp: string
    message: string
    code: number
    url?: string
    method?: string
}
interface NResponse<T = any> extends AResponse {
    data: T
}

declare module 'axios' {
    export interface AxiosInstance extends AxiosStatic {
        <T = any, R = NResponse<T>>(config: AxiosRequestConfig): Promise<R>
    }
}
