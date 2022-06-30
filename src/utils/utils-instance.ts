import { ref } from 'vue'
import { Observer } from '@/utils/utils-observer'
import { useAppStore } from '@/store/modules/app-store'

type ClientObserver = {
    resize: { width: number; device: string; collapse: boolean }
}

const client = new (class {
    public observer = new Observer<ClientObserver>()
    public store: any = null

    public async listener() {
        const width = document.body.getBoundingClientRect().width
        if (!this.store) {
            this.store = useAppStore()
        }

        if (width > 1080) {
            this.store.setDevice('PC')
            this.store.setCollapse(false)
            this.observer.emit('resize', { width, device: 'PC', collapse: false })
        } else if (width > 768) {
            this.store.setDevice('IPAD')
            this.store.setCollapse(true)
            this.observer.emit('resize', { width, device: 'IPAD', collapse: true })
        } else {
            this.store.setDevice('MOBILE')
            this.store.setCollapse(true)
            this.observer.emit('resize', { width, device: 'MOBILE', collapse: false })
        }
        return this.store.setWidth(width)
    }

    public async on() {
        return window.addEventListener('resize', this.listener.bind(this))
    }

    public async off() {
        return window.removeEventListener('resize', this.listener.bind(this))
    }
})()
export function useClient() {
    return { client }
}

/***************************************************************************************/
type IScroll = { distance: number; spin: boolean }
type InstanceObserver = {
    scroll: IScroll
}
const instance = new (class {
    public observer = new Observer<InstanceObserver>()

    /**滚动事件**/
    public onScrollbar(node: IScroll) {
        this.observer.emit('scroll', node)
    }
})()
export function useBatter() {
    const current = ref<boolean>(true)

    const setCurrent = (value: boolean) => {
        current.value = value
    }

    return { current, setCurrent, instance }
}
