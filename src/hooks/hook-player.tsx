import { ref, onMounted, defineComponent, computed, CSSProperties } from 'vue'
import { initPlayer, DoneOption } from '@/utils/utils-player'
import { Observer } from '@/utils/utils-observer'
import { useClient } from '@/utils/utils-instance'
import { NSpin } from 'naive-ui'
import DPlayer from 'dplayer'

export const NPlayer = defineComponent({
    name: 'NPlayer',
    props: {
        maxWidth: { type: Number, default: () => 1280 },
        scale: { type: Number, default: () => 16 / 9 }
    },
    emits: ['mounte'],
    setup(props, { emit }) {
        const { client } = useClient()
        const el = ref<HTMLElement | null>(null)
        const height = ref<number>(props.maxWidth / props.scale)
        const layer = computed<CSSProperties>(() => ({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000'
        }))
        const max = computed<CSSProperties>(() => ({
            width: '100%',
            maxWidth: props.maxWidth + 'px'
        }))
        const player = computed<CSSProperties>(() => ({
            width: '100%',
            height: height.value + 'px'
        }))
        const spin = computed<CSSProperties>(() => ({
            width: '100%',
            maxWidth: props.maxWidth + 'px',
            height: height.value + 'px',
            position: 'absolute'
        }))

        const onCompute = () => (height.value = (el.value as HTMLElement)?.clientWidth / props.scale)
        const done = client.observer.on('resize', e => onCompute())

        onMounted(() => {
            onCompute()
            emit('mounte', el.value)
        })

        return () => {
            return (
                <div style={layer.value} class="app-player">
                    <div style={max.value}>
                        <div style={player.value}>
                            <div style={spin.value}>
                                <NSpin size={48} style={{ width: '100%', height: '100%' }} />
                            </div>
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

    /**??????????????????**/
    const mounte = async (element: HTMLElement) => (el.value = element)

    /**??????????????????**/
    const init = async (option: IOption) => {
        return (client.value = initPlayer({ el: el.value, ...option }))
    }

    /**??????**/
    const play = async () => client.value?.play()

    /**??????**/
    const pause = async () => client.value?.pause()

    /**?????????????????????**/
    const seek = async (time: number) => client.value?.seek(time)

    /**????????????**/
    const speed = async (rate: number) => client.value?.speed(rate)

    /**????????????**/
    const volume = async (volume: number) => client.value?.volume(volume, true, false)

    /**??????**/
    const destroy = async () => client.value?.destroy()

    /**??????**/
    const reload = async (option: IOption) => destroy().then(() => init(option))

    return { client, observer, mounte, init, play, pause, seek, speed, volume, destroy, reload }
}
