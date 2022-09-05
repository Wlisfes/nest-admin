import { reactive, toRefs, nextTick, type UnwrapNestedRefs } from 'vue'
import { type AResponse } from '@/axios'
import { initMounte } from '@/utils/utils-tool'

interface IUResponse<T> extends AResponse {
    data: T
}
interface ISource<T> {
    loading: boolean
    node: T
}
interface IRequest<T> {
    immediate?: Boolean
    props?: Partial<ISource<T>>
    init: (e: UnwrapNestedRefs<ISource<T>>) => Promise<IUResponse<T>>
}

export function useRequest<T extends Object>(option: IRequest<T>) {
    const state = reactive<ISource<T>>(
        Object.assign({
            ...option.props,
            node: option.props?.node,
            loading: option.props?.loading
        })
    )

    const setState = (parameter: Partial<ISource<T>>, handler?: (e: typeof state) => void) => {
        return new Promise(resolve => {
            for (const key in parameter) {
                state[key as keyof typeof state] = parameter[key as keyof ISource<T>] as never
            }
            nextTick(() => {
                handler?.(state)
                resolve(state)
            })
        })
    }

    /**初始化接口**/
    const fetchRequest = (handler?: Function) => {
        return new Promise(async (resolve, reject) => {
            try {
                await setState({ loading: true } as never)
                const { data } = await option.init(state)
                setState({ node: data, loading: false }).then(() => {
                    handler?.(data)
                    resolve(data)
                })
            } catch (e) {
                setState({ loading: false } as never)
                reject(e)
            }
        })
    }

    /**更新接口**/
    const fetchUpdate = (parameter?: Partial<ISource<T>>, handler?: Function) => {
        return new Promise(async (resolve, reject) => {
            try {
                await setState(parameter as never)
                const data = await fetchRequest(handler)
                resolve(data)
            } catch (e) {
                reject(e)
            }
        })
    }

    initMounte(() => {
        if (option.immediate) {
            fetchRequest()
        }
    })

    return {
        ...toRefs(state),
        state,
        setState,
        fetchRequest,
        fetchUpdate
    }
}
