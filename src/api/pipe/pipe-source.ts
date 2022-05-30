import type { IProvider } from '@/api/pipe'

export type ISource = IProvider & {
	id: number
	name: string
	icon: string
	color: string
	status: number
	order: number
	comment: string | null
}
