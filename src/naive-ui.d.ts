import type { LoadingBarInst } from 'naive-ui/lib/loading-bar'
import type { NotificationApiInjection } from 'naive-ui/lib/notification'
import type { DialogApiInjection } from 'naive-ui/lib/dialog'
import type { MessageApiInjection } from 'naive-ui/lib/message'

declare global {
    interface Window {
        $message: MessageApiInjection
        $loading: LoadingBarInst
        $notification: NotificationApiInjection
        $dialog: DialogApiInjection
        AliyunUpload: {
            Vod: new (option) => any
        }
    }
}
