import { request } from '@/utils/utils-request'
import type { IBannerOption } from '@/api/pipe'

/**壁纸列表**/
export function httpWallpaper() {
	return request<Array<IBannerOption>>({ url: `/api/banner`, method: 'GET' })
}
