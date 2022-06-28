import { reactive, ref, toRefs, nextTick } from 'vue'
import { FormInst, FormRules } from 'naive-ui'

type ICompute = {
    account?: string
    password?: string
    code?: string
    loading?: boolean
}

export function useCompute(props?: ICompute) {
    const state = reactive<Required<ICompute>>({
        account: props?.account ?? '',
        password: props?.password ?? '',
        code: props?.code ?? '',
        loading: props?.loading ?? true
    })
    const formRef = ref<FormInst>()
    const rules = ref<FormRules>({
        account: [{ required: true, message: '请输入账号', trigger: 'change' }],
        password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6, message: '密码不能少于6位', trigger: 'change' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
    })

    const setState = (parameter: ICompute, handler?: (e: typeof state) => void) => {
        return new Promise(resolve => {
            for (const key in parameter) {
                state[key as keyof ICompute] = parameter[key as keyof ICompute] as never
            }
            nextTick(() => {
                handler?.(state)
                resolve(state)
            })
        })
    }

    return {
        ...toRefs(state),
        formRef,
        rules,
        state,
        setState
    }
}
