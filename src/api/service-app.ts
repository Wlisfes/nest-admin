import { request } from '@/utils/utils-request'

/**壁纸列表**/
export function httpWallpaper() {
    return request<Array<IBanner>>({ url: `/api/banner`, method: 'GET' })
}
