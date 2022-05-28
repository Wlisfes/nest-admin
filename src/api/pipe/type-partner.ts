import type { IDate, IPoster } from '@/api/pipe'

export type IPartner = IDate & {
	id: number
	title: string
	content: string
	html: string
	status: number
	description: string
}
