import { request } from '@/utils/utils-request'

/**音视频列表-客户端**/
export function httpClientClouds(params: { page: number; size: number; type?: number; title?: string }) {
    return request<ICloud>({ url: `/api/cloud/client/list-node`, method: 'GET', params })
}

/**音视频详情-客户端**/
export function httpClientCloud(params: { id: number }) {
    return request<ICloud>({ url: `/api/cloud/client/info`, method: 'GET', params })
}

/**番剧列表-授权管理端**/
export function httpCloudDinner(params: { page: number; size: number; status?: number | null; title?: string }) {
    return request<ICloud>({ url: `/api/cloud/dinner`, method: 'GET', params })
}

/**短片列表-授权管理端**/
export function httpCloudMedia(params: { page: number; size: number; status?: number | null; title?: string }) {
    return request<ICloud>({ url: `/api/cloud/media`, method: 'GET', params })
}

/**视频标签列表**/
export function httpColumnCloudSource(params: { page: number; size: number; status?: number | null; name?: string }) {
    return request<ICloudSource>({
        url: `/api/cloud-source/list-node`,
        method: 'GET',
        params
    })
}
