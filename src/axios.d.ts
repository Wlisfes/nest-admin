import type { AxiosStatic } from 'axios'

interface NResponse<T = any> {
	data: T
	timestamp: string
	message: string
	code: number
	url?: string
	method?: string
}

declare module 'axios' {
	export interface AxiosInstance extends AxiosStatic {
		<T = any, R = NResponse<T>>(config: AxiosRequestConfig): Promise<R>
	}
}
