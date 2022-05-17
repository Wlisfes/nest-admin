import Day from 'dayjs'

export function moment(date?: Day.ConfigType): Day.Dayjs {
	return Day(date)
}

export function loadFile(path: string) {
	return new URL(`../assets/${path}`, import.meta.url).href
}
