import { reactive, ref, toRefs, nextTick, computed, onMounted } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { useUserStore } from '@/store/modules/user-store'
import { initMounte } from '@/utils/utils-tool'

type ICompute = {
    account?: string
    password?: string
    code?: string
    nickname?: string
    email?: string
    loading?: boolean
    duration?: number
    sending?: boolean
}

export function useCompute(props?: ICompute) {
    const { login, register } = useUserStore()
    const state = reactive<Required<ICompute>>({
        account: props?.account ?? '',
        password: props?.password ?? '',
        code: props?.code ?? '',
        nickname: props?.nickname ?? '',
        email: props?.email ?? '',
        loading: props?.loading ?? false,
        duration: props?.duration ?? 0,
        sending: props?.sending ?? false
    })

    const codeURL = ref<string>('')
    const formRef = ref<FormInst>()
    const rules = ref<FormRules>({
        account: [{ required: true, message: '请输入账号', trigger: 'change' }],
        password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6, max: 20, message: '密码长度必须6~20位', trigger: 'change' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'change' }],
        nickname: [{ required: true, message: '请输入用户昵称', trigger: 'change' }],
        email: [
            { required: true, message: '请输入邮箱', trigger: 'change' },
            { type: 'email', message: '邮箱格式错误', trigger: 'change' }
        ]
    })

    const isEmail = computed<boolean>(() => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            state.email
        )
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

    const onRefresh = () => {
        codeURL.value = `${import.meta.env.VITE_API_BASE}/api/user/code?t=${Date.now()}`
    }

    const startDuration = (value: number) => {
        if (state.duration === 0) {
            setState({ duration: value }).then(() => {
                const interval = setInterval(() => {
                    if (state.duration > 0) {
                        state.duration--
                    } else {
                        interval && clearInterval(interval)
                    }
                }, 1000)
            })
        }
    }

    onMounted(() => {
        setTimeout(onRefresh, 500)
    })

    return {
        ...toRefs(state),
        codeURL,
        formRef,
        rules,
        state,
        isEmail,
        setState,
        onRefresh,
        login,
        register,
        startDuration
    }
}
