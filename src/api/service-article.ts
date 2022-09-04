import { request } from '@/utils/utils-request'

/**文章列表-客户端**/
export function httpClientArticles(params: { page: number; size: number; title?: string; source?: number }) {
    return request<IArticle>({
        url: `/api/article/client/list-node`,
        method: 'GET',
        params
    })
}

/**文章详情-客户端**/
export function httpClientArticle(params: { id: number }) {
    return request<IArticle>({ url: `/api/article/client/info`, method: 'GET', params })
}

/**文章列表-授权管理端**/
export function httpColumnArticle(params: {
    page: number
    size: number
    status?: number | null
    title?: string | null
    source?: number | null
}) {
    return request<IArticle>({ url: `/api/article/list-node`, method: 'GET', params })
}
