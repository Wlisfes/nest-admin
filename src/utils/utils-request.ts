import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { getToken } from '@/utils/utils-cookie'

export const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 60000
})

const interNotice = (error: AxiosError) => {
    const notification = window.$notification
    if (error?.response) {
        const { data, status } = error.response
        switch (status) {
            case 400:
                notification.error({ duration: 2000, title: '管道拦截', content: data.message })
                break
            case 401:
                notification.error({ duration: 2000, title: '守卫拦截', content: data.message })
                break
            case 403:
                notification.error({ duration: 2000, title: '账号异常', content: data.message })
                break
            default:
                notification.error({ duration: 2000, title: '服务器开了小个差', content: data.message })
                break
        }
        return Promise.reject(data || error.response)
    }
    return Promise.reject(error)
}

request.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getToken()
        if (token && config.headers) {
            config.headers['app-token'] = token
        }
        return config
    },
    (error: AxiosError) => interNotice(error)
)

request.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data
    },
    (error: AxiosError) => interNotice(error)
)

export default request
