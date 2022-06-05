import type { IProvider, ISource, IUser } from '@/api/pipe'

export type IArticle = IProvider & {
	id: number
	title: string
	cover: string
	content: string
	html: string
	description: string | null
	url: string
	status: number
	order: number
	browse: number
	comment: number
	star: { total: number; where: boolean }
	source: Array<ISource>
	list: Array<IArticle>
	user: IUser
}
