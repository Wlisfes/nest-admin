import { reactive, toRefs, nextTick } from 'vue'

type IState<T> = {
    page?: number
    size?: number
    total?: number
    loading?: boolean
    dataSource?: Array<T>
}

export function useState<T, R extends Object>(data?: { props?: IState<T>; params?: R }) {
    const { props, params } = data ?? {}
    const state = reactive<Required<IState<T> & R>>(
        Object.assign({
            ...params,
            page: props?.page ?? 1,
            size: props?.size ?? 10,
            total: props?.total ?? 0,
            loading: props?.loading ?? true,
            dataSource: props?.dataSource ?? []
        })
    )

    const setState = (parameter: IState<T> & Partial<R>, handler?: (e: typeof state) => void) => {
        return new Promise(resolve => {
            for (const key in parameter) {
                state[key as keyof IState<T> & R] = parameter[key as keyof IState<T> & R] as never
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
