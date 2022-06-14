import { h, Component } from 'vue'
import { NIcon as Icon } from 'naive-ui'
import { LocationOutline, ChevronBack, ChevronForward } from '@vicons/ionicons5'

const Icons = {
    LocationOutline,
    ChevronBack,
    ChevronForward
}

export function useCompute() {
    const compute = (name: keyof typeof Icons): Component => {
        return h(Icons[name])
    }

    return { Icon, compute }
}
