import { reactive, toRefs, nextTick } from 'vue'

type IForm = {
    visible: boolean
}

export function useForm<T extends Object>(props?: Partial<IForm & T>) {
    const state = reactive<IForm & T>(
        Object.assign({
            ...props,
            visible: false
        })
    )

    const setState = (parameter: Partial<T & IForm>, handler?: (e: typeof state) => void) => {
        return new Promise(resolve => {
            for (const key in parameter) {
                state[key as keyof IForm & T] = parameter[key as keyof IForm & T] as never
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
