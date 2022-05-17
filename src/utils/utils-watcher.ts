import { onBeforeUnmount } from 'vue'
import { Observer } from '@/utils/utils-observer'
import { useAppStore } from '@/store/modules/app-store'

export type ObserverEvent = {
	resize: { width: number; device: string; collapse: boolean }
}

export class Watcher {
	private static instance: Watcher | null = null
	public observer: Observer<ObserverEvent>
	public store

	constructor() {
		this.observer = new Observer()
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
