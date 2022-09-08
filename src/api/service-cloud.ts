import type { ICloud, ISource } from '@/interface/api/http-cloud'
import { request } from '@/utils/utils-request'

export interface Parameter {
    id: number
    page: number
    size: number
    name?: string | null
    status?: number | null
    type?: number | null
    title?: string | null
    source?: number | null
}

/**音视频列表-客户端**/
export function httpClientClouds(params: { page: number; size: number; type?: number; title?: string }) {
    return request<ICloud>({ url: `/api/cloud/client/list-node`, method: 'GET', params })
}

/**音视频详情-客户端**/
export function httpClientCloud(params: { id: number }) {
    return request<ICloud>({ url: `/api/cloud/client/info`, method: 'GET', params })
}

/**番剧列表*****************************************************************************************************/
export function httpRowDinner(params: Pick<Parameter, 'page' | 'size' | 'status' | 'title'>) {
    return request<ICloud>({ url: `/api/cloud/dinner`, method: 'GET', params })
}

/**短片列表**/
export function httpRowMedia(params: Pick<Parameter, 'page' | 'size' | 'status' | 'title'>) {
    return request<ICloud>({ url: `/api/cloud/media`, method: 'GET', params })
}

/**视频标签列表**/
export function httpRowSource(params: Pick<Parameter, 'page' | 'size' | 'status' | 'name'>) {
    return request<ISource>({
        url: `/api/cloud-source/list-node`,
        method: 'GET',
        params
    })
}
