import Day from 'dayjs'

/**时间日期库**/
export function moment(date?: Day.ConfigType): Day.Dayjs {
	return Day(date)
}

/**文件导入函数**/
export function loadFile(path: string) {
	return new URL(`../assets/${path}`, import.meta.url).href
}

/**图片缓存加载**/
export function loadCover(url: string): Promise<HTMLImageElement> {
	return new Promise(resolve => {
		const image = new Image()
		image.src = url
		image.onload = () => resolve(image)
	})
}

/**自执行函数**/
export async function initMounte(handler: Function) {
	return handler()
}
