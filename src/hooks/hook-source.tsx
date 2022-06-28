import { reactive, toRefs, nextTick } from 'vue'

type ISource<T> = {
    page?: number
    size?: number
    total?: number
    loading?: boolean
    dataSource?: Array<T>
}

export function useSource<R>(props?: ISource<R>) {
    const state = reactive<Required<ISource<R>>>({
        page: props?.page ?? 1,
        size: props?.size ?? 10,
        total: props?.total ?? 0,
        loading: props?.loading ?? true,
        dataSource: props?.dataSource ?? []
    })

    const setState = (parameter: ISource<R>, handler?: (e: typeof state) => void) => {
        return new Promise(resolve => {
            for (const key in parameter) {
                state[key as keyof ISource<R>] = parameter[key as keyof ISource<R>] as never
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
