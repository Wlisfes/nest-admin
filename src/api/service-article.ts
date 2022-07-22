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
    return request<IArticle>({
        url: `/api/article/client/info`,
        method: 'GET',
        params
    })
}
