import type { LoadingBarInst } from 'naive-ui/lib/loading-bar/index'

declare global {
	interface Window {
		$loading: LoadingBarInst
	}
}
