import { createVNode } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import UIcon from '@/components/global/u-icon.vue'

export function useToRoute(source: RouteRecordRaw[]): MenuOption[] {
	const response: MenuOption[] = []
	for (const node of source) {
		if (node.meta?.hidden) {
			break
		}

		if (node.meta?.root) {
			const nodes = useToRoute(node.children || [])
			if (nodes.length) {
				response.push(...nodes)
			}
			break
		}

		const props: MenuOption = { key: node.path, label: node.meta?.title }
		const children = useToRoute(node.children || [])

		if (children.length) {
			props.children = children
		}

		if (node.meta?.icon) {
			props.icon = () => createVNode(UIcon, { name: node.meta?.icon, size: 22 })
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
