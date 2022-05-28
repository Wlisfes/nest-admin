import type { IDate } from '@/api/pipe'

export type IUser = IDate & {
	id: number
	uid: number
	account: number
	nickname: string
	email: string | null
	avatar: string | null
	comment: string | null
	mobile: number | string | null
	password: string
	status: number
}
