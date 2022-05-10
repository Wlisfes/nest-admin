/**
 * @param e 事件Event
 * @param handler 回调函数
 */
export function stopEvent(e: Event, handler?: Function) {
	e.preventDefault()
	e.stopPropagation()
	handler?.()
}
