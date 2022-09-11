import type { IPoster, IChunk } from '@/interface/api/http-resource'
import { request } from '@/utils/utils-request'

export interface IOption {
    label: string
    value: number
    width: number
    scale: number
    type: 'error' | 'success' | 'info' | 'warning'
}

export interface Parameter {
    id: number
    page: number
    size: number
    url: string
    path: string
    name: string
    version: string | null
    option: Array<IOption>
    status?: number | null
    type?: number | null
}

/**版本资源列表**/
export function httpRowChunk(params: Pick<Parameter, 'page' | 'size'>) {
    return request<IChunk>({ url: `/api/chunk/list-node`, method: 'GET', params })
}

/**创建版本资源**/
export function httpCreateChunk(params: Pick<Parameter, 'url' | 'path' | 'name' | 'version'>) {
    return request<IChunk>({ url: `/api/chunk/create`, method: 'POST', data: params })
}

/**图床列表***************************************************************************************/
export function httpRowPoster(params: Pick<Parameter, 'page' | 'size' | 'status' | 'type'>) {
    return request<IPoster>({ url: `/api/poster/list-node`, method: 'GET', params })
}

/**修改图床状态**/
export function httpPutPoster(params: Pick<Parameter, 'id'>) {
    return request<IPoster>({ url: `/api/poster/cutover`, method: 'PUT', data: params })
}

/**删除图床**/
export function httpDeletePoster(params: Pick<Parameter, 'id'>) {
    return request<IPoster>({ url: `/api/poster/del`, method: 'DELETE', params })
}

/**创建图床**/
export function httpCreatePoster(params: Pick<Parameter, 'type' | 'path' | 'url'>) {
    return request<IPoster>({ url: `/api/poster/create`, method: 'POST', data: params })
}
