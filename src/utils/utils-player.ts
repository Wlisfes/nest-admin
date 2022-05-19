import DPlayer from 'dplayer'

export interface DoneOption {
	el: HTMLElement | null
	url: string
	cover?: string
	autoplay?: boolean
	theme?: string
	lang?: 'en' | 'zh-cn' | 'zh-tw'
}
export function initPlayer(option: DoneOption) {
	const client = new DPlayer({
		container: option.el,
		theme: option.theme ?? '#fb7299',
		lang: option.lang ?? 'zh-cn',
		video: {
			url: option.url,
			pic: option.cover
		}
	})

	return client
}
