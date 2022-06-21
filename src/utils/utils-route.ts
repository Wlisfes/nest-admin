import type { MenuOption } from 'naive-ui'
import type { IRoute } from '@/api/pipe'
import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { useCompute } from '@/hooks/hook-icon'

export function useToRoute(source: IRoute[]): MenuOption[] {
    const { compute } = useCompute()
    return source.map(node => {
        const option: MenuOption = { key: node.router || node.id, label: node.title }
        if (node.children?.length) {
            option.children = useToRoute(node.children || [])
        }
        if (node.icon) {
            option.icon = () => h(NIcon, { size: 20, component: compute('GithubOutlined') })
        }
        return option
    })
}

export function bfs(target: MenuOption[], path: string, children = 'children') {
    const quene = [...target]
    do {
        const current = quene.shift()
        if (current?.[children]) {
            const node = ((current as any)[children] || []).map((x: MenuOption) => {
                return {
                    ...x,
                    current: (current.current || current.key) + '*' + x.key
                }
            })
            quene.push(...node)
        }
        if (current?.key === path) {
            return { ...current }
        }
    } while (quene.length)
    return undefined
}
