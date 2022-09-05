import type { AResponse } from '@/axios'
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
interface IResponse<T = Object> extends AResponse {
    data: { list: Array<T>; total: number; page: number; size: number }
}
interface IOption<T, R> {
    props?: Partial<ISource<T> & R>
    immediate?: Boolean
    init: (e: UnwrapNestedRefs<ISource<T> & R>) => Promise<IResponse<T>>
}

export function useSource<T, R extends Object>(option: IOption<T, R>) {
    const { props, immediate, init } = option
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
                const { data } = await init(state)
                setState({
                    total: data.total,
                    dataSource: data.list || [],
                    loading: false
                } as never).then(() => {
                    handler?.(data)
                    resolve(data)
                })
            } catch (e) {
                setState({ loading: false } as never)
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
        if (immediate) {
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
