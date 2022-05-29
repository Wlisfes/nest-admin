import type { IProvider, IPoster, IUser } from '@/api/pipe'

export type IPartner = IProvider & {
	id: number
	title: string
	content: string
	html: string
	status: number
	description: string
	cover: Array<IPoster>
	list: Array<IPartner>
	user: IUser
}
