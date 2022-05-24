import DPlayer, { DPlayerVideo } from 'dplayer'
import flv from 'flv.js'

export interface DoneOption {
	el: HTMLElement | null
	url: string
	cover?: string
	autoplay?: boolean
	theme?: string
	lang?: 'en' | 'zh-cn' | 'zh-tw'
}

export function initPlayer(option: DoneOption) {
	const format = option.url.split('.').pop()?.split('?')?.shift()?.toLocaleUpperCase()
	let video: DPlayerVideo = { type: 'auto', url: option.url, pic: option.cover }
	switch (format) {
		case 'FLV':
			video = Object.assign(video, {
				type: 'customFlv',
				customType: {
					customFlv: (video: HTMLVideoElement) => {
						const player = flv.createPlayer({ type: 'flv', url: video.src })
						player.attachMediaElement(video)
						player.load()
					}
				}
			})
			break
	}

	return new DPlayer({
		container: option.el,
		autoplay: option.autoplay ?? false,
		theme: option.theme ?? '#fb7299',
		lang: option.lang ?? 'zh-cn',
		video
	})
}
