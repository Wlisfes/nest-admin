import type { LoadingBarInst } from 'naive-ui/lib/loading-bar/index'
import type { NotificationApiInjection } from 'naive-ui/lib/notification/index'

declare global {
	interface Window {
		$loading: LoadingBarInst
		$notification: NotificationApiInjection
		AliyunUpload: {
			Vod: new (option) => any
		}
	}
}
