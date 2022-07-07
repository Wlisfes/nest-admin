import { reactive, toRefs, nextTick } from 'vue'

type ISource<T> = {
    page: number
    size: number
    total: number
    loading: boolean
    dataSource: Array<T>
}

export function useSource<T, R extends Object>(props?: Partial<ISource<T> & R>) {
    const state = reactive<ISource<T> & R>(
        Object.assign({
            ...props,
            page: props?.page ?? 1,
            size: props?.size ?? 10,
            total: props?.total ?? 0,
            loading: props?.loading ?? true,
            dataSource: props?.dataSource ?? []
        })
    )

    const setState = (parameter: Partial<ISource<T> & R>, handler?: (e: typeof state) => void) => {
        return new Promise(resolve => {
            for (const key in parameter) {
                state[key as keyof ISource<T> & R] = parameter[key as keyof ISource<T> & R] as never
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
