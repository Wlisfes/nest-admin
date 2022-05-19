import { ref, onMounted } from 'vue'
import { initPlayer } from '@/utils/utils-player'
import { Observer } from '@/utils/utils-observer'
import DPlayer from 'dplayer'

export interface PropsOption {}

export function usePlayer(option: PropsOption) {
	const el = ref<HTMLElement | null>(null)
	const client = ref<DPlayer>()
	const observer = new Observer()

	onMounted(() => init())

	/**初始化播放器**/
	const init = () => {
		client.value = initPlayer({
			el: el.value,
			url: `https://cloud.lisfes.cn/ffc459f3567e40b793e70d58bf0258f9/96f8fe5fb63c4ba184e1dfd3c5032e28-ab2cf1d2c6e8701c8a24e3bcd310f84f-hd.mp4?auth_key=1653051233-c86d913f2e58463793509c08a71dbbe7-0-58bd833214de157c1b5dd42e425172c6`,
			cover: `https://oss.lisfes.cn/cloud/cover/2021-08/1628497707293.jpg`
		})
	}

	const destroy = () => {
		return new Promise<void>(resolve => {
			client.value?.destroy()
			resolve()
		})
	}

	/**重新加载视频**/
	const reload = () => {
		destroy().finally(() => {
			client.value = initPlayer({
				el: el.value,
				autoplay: true,
				url: `https://cloud.lisfes.cn/72bc55d65d2d4e13a2c4c798a4cb37b6/814144d261984468873b81d1015fbe97-63eb4e93716e2ffed17b7e6c260e38e5-hd.mp4?auth_key=1653047671-42d0517269db44ea92200f6f373b2571-0-a8dde6501bb39c567ee4969e4cb16052`,
				cover: `https://oss.lisfes.cn/cloud/cover/2021-09/1632913648240.jpg`
			})
		})
	}
	const play = () => client.value?.play()
	const pause = () => client.value?.pause()
	const seek = (time: number) => client.value?.seek(time)
	const speed = (rate: number) => client.value?.speed(rate)

	return { el, client, observer, reload, play, pause, seek, speed }
}
