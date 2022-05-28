import { request } from '@/utils/utils-request'
import type { IBanner } from '@/api/pipe'

/**壁纸列表**/
export function httpWallpaper() {
	return request<Array<IBanner>>({ url: `/api/banner`, method: 'GET' })
}
