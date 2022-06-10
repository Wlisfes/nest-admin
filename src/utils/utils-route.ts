import type { MenuOption } from 'naive-ui'
import type { IRoute } from '@/api/pipe'
import { createVNode } from 'vue'
import { UIcon } from '@/components/global'

export function useToRoute(source: IRoute[]): MenuOption[] {
    const response: MenuOption[] = []
    for (const node of source) {
        if (!node.visible) {
            continue
        }
        // if (node.meta?.root) {
        // 	const nodes = useToRoute(node.children || [])
        // 	if (nodes.length) {
        // 		response.push(...nodes)
        // 	}
        // 	break
        // }
        const props: MenuOption = { key: node.router || node.id, label: node.name }
        const children = useToRoute(node.children || [])
        if (children.length) {
            props.children = children
        }
        if (node.icon) {
            props.icon = () => createVNode(UIcon, { name: 'antd-' + node.icon, size: 22 })
        }
        response.push(props)
    }
    return response
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
