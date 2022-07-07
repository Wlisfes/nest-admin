import { reactive, toRefs, nextTick, type UnwrapNestedRefs } from 'vue'

export function useState<T extends Object>(props?: Partial<T>) {
    const state = reactive<T>(Object.assign({ ...props }))

    const setState = (parameter: Partial<T>, handler?: (e: typeof state) => void) => {
        return new Promise(resolve => {
            for (const key in parameter) {
                state[key as keyof UnwrapNestedRefs<T>] = parameter[key as keyof T] as never
            }
            nextTick(() => {
                handler?.(state)
                resolve(state)
            })
        })
    }

    return {
        ...toRefs(state),
        state,
        setState
    }
}
