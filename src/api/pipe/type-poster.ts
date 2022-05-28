import type { IDate } from '@/api/pipe'

export type IPoster = IDate & {
	id: number
	type: number
	url: string
	path: string
	status: number
}
