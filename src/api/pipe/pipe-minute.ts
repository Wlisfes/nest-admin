import type { IProvider, ISource, IUser } from '@/api/pipe'

export type IMinute = IProvider & {
	id: number
	name: string
	cover: string
	description: string | null
	url: string
	npm: string
	github: string
	status: number
	order: number
	source: Array<ISource>
	list: Array<IMinute>
	user: IUser
}
