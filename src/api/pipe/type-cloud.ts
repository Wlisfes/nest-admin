import type { IDate } from '@/api/pipe'

export type ICloudOption = IDate & {
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
	parent: ICloudOption
	children: Array<ICloudOption>
}
