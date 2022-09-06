import type { ISource, IArticle, IMinute } from '@/interface/api/http-manager'
import { request } from '@/utils/utils-request'

export interface Parameter {
    id: number
    page: number
    size: number
    status?: number | null
    name?: string | null
    title?: string | null
    source?: number | null
}

/**标签列表-授权管理端**/
export function httpRowSource(params: Pick<Parameter, 'page' | 'size' | 'status' | 'name'>) {
    return request<ISource>({ url: `/api/source/list-node`, method: 'GET', params })
}

/**收录列表***************************************************************************************************/
export function httpRowMinute(params: Pick<Parameter, 'page' | 'size' | 'status' | 'name' | 'source'>) {
    return request<IMinute>({ url: `/api/minute/list-node`, method: 'GET', params })
}

/**文章列表***************************************************************************************************/
export function httpRowArticle(params: Pick<Parameter, 'page' | 'size' | 'status' | 'title' | 'source'>) {
    return request<IArticle>({ url: `/api/article/list-node`, method: 'GET', params })
}

/**文章列表-客户端**/
export function httpClientRowArticle(params: Pick<Parameter, 'page' | 'size' | 'title' | 'source'>) {
    return request<IArticle>({ url: `/api/article/client/list-node`, method: 'GET', params })
}

/**文章详情-客户端**/
export function httpClientOneArticle(params: Pick<Parameter, 'id'>) {
    return request<IArticle>({ url: `/api/article/client/info`, method: 'GET', params })
}
