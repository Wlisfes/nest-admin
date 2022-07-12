/**
 * @param e 事件Event
 * @param handler 回调函数
 */
export function stopEvent(e: Event, handler?: Function) {
    e.preventDefault()
    e.stopPropagation()
    handler?.()
}

/**
 * @param e 键盘事件Event
 * @param key 键盘key
 * @param handler 回调函数
 */
export function useEnter(e: KeyboardEvent, key: string, handler?: Function) {
    if (e.key === key) {
        handler?.()
    }
}
