import { onBeforeUnmount } from 'vue'
import { Observer } from '@/utils/utils-observer'
import { useAppStore } from '@/store/modules/app-store'

type WatcherEvent = {
	resize: { width: number; device: string; collapse: boolean }
}
class Watcher {
	private static instance: Watcher | null = null
	public observer
	public store

	constructor() {
		this.observer = new Observer<WatcherEvent>()
		this.store = useAppStore()
		this.listener().finally(() => this.on())
	}

	public static getInstance() {
		if (!Watcher.instance) {
			Watcher.instance = new Watcher()
		}
		return Watcher.instance
	}

	private async listener() {
		const width = document.body.getBoundingClientRect().width

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

	public on() {
		window.addEventListener('resize', this.listener.bind(this))
	}

	public off() {
		window.removeEventListener('resize', this.listener.bind(this))
	}
}

export function useWatcher() {
	const instance = Watcher.getInstance()
	onBeforeUnmount(() => instance.off())
	return instance
}

/***************************************************************************************/
type IScroll = { distance: number; spin: boolean }
type InstanceEvent = {
	scroll: IScroll
}
export const instance = new (class {
	public observer = new Observer<InstanceEvent>()

	/**滚动事件**/
	public onScrollbar(node: IScroll) {
		this.observer.emit('scroll', node)
	}
})()
