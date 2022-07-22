import type { MenuOption } from 'naive-ui'
import type { RouteColumn } from '@/router/routes/auth-routes'
import { h } from 'vue'
import { Icons, useRxicon } from '@/hooks/hook-icon'

export function useToRoute(source: Array<RouteColumn>, role: Array<IRole>): Array<MenuOption> {
    const { Icon, compute } = useRxicon()
    const response: Array<MenuOption> = []
    for (const node of source) {
        const option: MenuOption = { key: node.path, label: node.meta?.title, meta: node.meta || {} }

        if (node.meta?.role?.length) {
            // 如果有角色限制，则检查是否有权限
            const hasRole = node.meta.role.some(key => {
                return role.some(x => x.status === 1 && x.primary === key)
            })
            if (!hasRole) {
                continue
            }
        }

        if (node.meta?.hidden) {
            //当前菜单设置隐藏、直接过滤
            continue
        } else if (node.meta?.root && node.children?.length) {
            const nodes = useToRoute(node.children as Array<RouteColumn>, role)
            response.push(...nodes)
            continue
        } else if (node.children?.length) {
            option.children = useToRoute(node.children as Array<RouteColumn>, role)
        }

        if (node.meta?.icon) {
            option.icon = () => h(Icon, { size: 20, component: compute(node.meta?.icon as keyof typeof Icons) })
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
