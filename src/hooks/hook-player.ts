import { initPlayer, DoneOption } from '@/utils/utils-player'
import { Observer } from '@/utils/utils-observer'

export interface PropsOption extends DoneOption {}

export function usePlayer(option: PropsOption) {
	const observer = new Observer()
	const client = initPlayer(option)

	return { client }
}
