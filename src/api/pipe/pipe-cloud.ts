import type { IProvider, IUser } from '@/api/pipe'

export type ICloud = IProvider & {
	id: number
	type: number
	title: string
	key: string
	name: string
	path: string
	cover: string
	status: number
	order: number
	size: number
	browse: number
	comment: number
	star: { total: number; where: boolean }
	description: string
	parent: ICloud
	user: IUser
	children: Array<ICloud>
	list: Array<ICloud>
}
