import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import type { IRole } from '@/api/pipe'
import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { Icons, useCompute } from '@/hooks/hook-icon'

export function useToRoute(source: Array<RouteRecordRaw>, role: Array<IRole>): Array<MenuOption> {
    const { compute } = useCompute()
    const response: Array<MenuOption> = []
    for (const node of source) {
        const option: MenuOption = { key: node.path, label: node.meta?.title }

        if (node.meta?.role) {
            // 如果有角色限制，则检查是否有权限
            const hasRole = role.some(x => {
                return x.status === 1 && (node.meta as any).role.includes(x.primary)
            })
            if (!hasRole) continue
        }

        if (node.meta?.hidden) {
            //当前菜单设置隐藏、直接过滤
            continue
        } else if (node.meta?.root && node.children?.length) {
            const nodes = useToRoute(node.children, role)
            response.push(...nodes)
            continue
        } else if (node.children?.length) {
            option.children = useToRoute(node.children, role)
        }

        if (node.meta?.icon) {
            option.icon = () => h(NIcon, { size: 20, component: compute(node.meta?.icon as keyof typeof Icons) })
        }

        response.push(option)
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
