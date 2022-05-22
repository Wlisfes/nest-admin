import { ref, onMounted, defineComponent, computed, CSSProperties } from 'vue'
import { initPlayer, DoneOption } from '@/utils/utils-player'
import { Observer } from '@/utils/utils-observer'
import { useWatcher } from '@/utils/utils-watcher'
import DPlayer from 'dplayer'

export const NPlayer = defineComponent({
	name: 'NPlayer',
	props: {
		maxWidth: { type: Number, default: () => 1280 },
		scale: { type: Number, default: () => 16 / 9 }
	},
	emits: ['mounte'],
	setup(props, { emit }) {
		const el = ref<HTMLElement | null>(null)
		const height = ref<number>(props.maxWidth / props.scale)
		const client = useWatcher()
		const done = client.observer.on('resize', e => {
			height.value = (el.value as HTMLElement)?.clientWidth / props.scale
		})
		const layer = computed<CSSProperties>(() => ({
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#000000'
		}))
		const layout = computed<CSSProperties>(() => ({
			width: '100%',
			maxWidth: props.maxWidth + 'px'
		}))
		const player = computed<CSSProperties>(() => ({
			width: '100%',
			height: height.value + 'px'
		}))

		onMounted(() => emit('mounte', el.value))

		return () => {
			return (
				<div style={layer.value} class="app-player">
					<div style={layout.value}>
						<div style={player.value}>
							<div ref={el} style={{ width: '100%', height: '100%' }}></div>
						</div>
					</div>
				</div>
			)
		}
	}
})

export type IOption = Pick<DoneOption, 'url' | 'cover' | 'autoplay' | 'lang' | 'theme'> & {}
export function usePlayer() {
	const el = ref<HTMLElement | null>(null)
	const client = ref<DPlayer>()
	const observer = new Observer()

	/**获取挂载元素**/
	const mounte = async (element: HTMLElement) => (el.value = element)

	/**初始化播放器**/
	const init = (option: IOption) => {
		client.value = initPlayer({ el: el.value, ...option })
	}

	/**播放**/
	const play = () => client.value?.play()

	/**暂停**/
	const pause = () => client.value?.pause()

	/**跳转到特定时间**/
	const seek = (time: number) => client.value?.seek(time)

	/**设置速度**/
	const speed = (rate: number) => client.value?.speed(rate)

	/**设置音量**/
	const volume = (volume: number) => client.value?.volume(volume, true, false)

	/**销毁**/
	const destroy = async () => client.value?.destroy()

	/**重载**/
	const reload = (option: IOption) => destroy().finally(() => init(option))

	return { client, observer, mounte, init, play, pause, seek, speed, volume, destroy, reload }
}
