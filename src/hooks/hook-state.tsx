import { reactive, toRefs, nextTick } from 'vue'

type IState<T> = {
    page?: number
    size?: number
    total?: number
    loading?: boolean
    dataSource?: Array<T>
}

export function useState<R>(props?: IState<R>) {
    const state = reactive<Required<IState<R>>>({
        page: props?.page ?? 1,
        size: props?.size ?? 10,
        total: props?.total ?? 0,
        loading: props?.loading ?? true,
        dataSource: props?.dataSource ?? []
    })

    const setState = (parameter: IState<R>, handler?: (e: typeof state) => void) => {
        return new Promise(resolve => {
            for (const key in parameter) {
                state[key as keyof IState<R>] = parameter[key as keyof IState<R>] as never
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
