import { h, Component } from 'vue'
import { NIcon as Icon } from 'naive-ui'
import { LocationOutline } from '@vicons/ionicons5'
import {
    LeftOutlined,
    RightOutlined,
    MenuOutlined,
    UserOutlined,
    DashboardOutlined,
    LogoutOutlined,
    LoginOutlined,
    LockOutlined,
    VerifiedOutlined
} from '@vicons/antd'

export const Icons = {
    LocationOutline,
    LeftOutlined,
    RightOutlined,
    MenuOutlined,
    UserOutlined,
    DashboardOutlined,
    LogoutOutlined,
    LoginOutlined,
    LockOutlined,
    VerifiedOutlined
}

export function useCompute() {
    const compute = (name: keyof typeof Icons): Component => {
        return h(Icons[name])
    }

    return { Icon, compute }
}
