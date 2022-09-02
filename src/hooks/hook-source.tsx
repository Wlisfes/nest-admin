import { reactive, toRefs, nextTick, type UnwrapNestedRefs } from 'vue'
import { initMounte } from '@/utils/utils-tool'

interface ISource<T> {
    page: number
    size: number
    total: number
    loading: boolean
    status: number | null
    dataSource: Array<T>
}
interface FNource<T, R> {
    immediate?: Boolean
    init: (e: UnwrapNestedRefs<ISource<T> & R>) => Promise<IResponse<T>>
}
interface IResponse<T = Object> {
    data: { list: Array<T>; total: number }
    timestamp: string
    message: string
    code: number
    url?: string
    method?: string
}

export function useSource<T, R extends Object>(fn: FNource<T, R>, props?: Partial<ISource<T> & R>) {
    const state = reactive<ISource<T> & R>(
        Object.assign({
            ...props,
            page: props?.page ?? 1,
            size: props?.size ?? 10,
            total: props?.total ?? 0,
            loading: props?.loading ?? true,
            status: props?.status ?? null,
            dataSource: props?.dataSource ?? []
        })
    )

    const setState = (parameter: Partial<ISource<T> & R>, handler?: (e: typeof state) => void) => {
        return new Promise(resolve => {
            for (const key in parameter) {
                state[key as keyof typeof state] = parameter[key as keyof ISource<T> & R] as never
            }
            nextTick(() => {
                handler?.(state)
                resolve(state)
            })
        })
    }

    /**初始化列表接口**/
    const fetchSource = (handler?: Function) => {
        return new Promise(async (resolve, reject) => {
            try {
                await setState({ loading: true } as never)
                const { data } = await fn.init(state)
                setState({
                    total: data.total,
                    dataSource: data.list || [],
                    loading: false
                } as never).then(() => {
                    handler?.(data)
                    resolve(data)
                })
            } catch (e) {
                reject(e)
            }
        })
    }

    /**列表更新**/
    const fetchUpdate = (parameter?: Partial<ISource<T> & R>, handler?: Function) => {
        return new Promise(async (resolve, reject) => {
            try {
                await setState(parameter as never)
                const data = await fetchSource(handler)
                resolve(data)
            } catch (e) {
                reject(e)
            }
        })
    }

    initMounte(() => {
        if (fn.immediate) {
            fetchSource()
        }
    })

    return {
        state,
        ...toRefs(state),
        setState,
        fetchSource,
        fetchUpdate
    }
}
