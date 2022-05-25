<script lang="tsx">
import { defineComponent } from 'vue'
import { AppContainer } from '@/components/global'
import { useProvider } from '@/hooks/hook-provider'
import { usePlayer, NPlayer } from '@/hooks/hook-player'
import { httpClientCloud, httpCloudCheck, httpCloudFile } from '@/api/service'

export default defineComponent({
	name: 'Home',
	setup() {
		const { vars } = useProvider()
		const { mounte, init, play } = usePlayer()

		const useHttpClientCloud = (id: number = 44) => {
			httpClientCloud({ id }).then(async ({ data: { key, cover } }) => {
				try {
					const { data, code }: any = await httpCloudCheck({ VideoId: key, AuthTimeout: 24 * 60 * 60 }).then(
						async response => {
							if (!response.data.base || response.data.list.length === 0) {
								return await httpCloudFile({ VideoId: key, AuthTimeout: 24 * 60 * 60 })
							}
							return response
						}
					)
					if (code === 200) {
						init({
							cover: cover || data.base.CoverURL,
							url: data.list?.[0].PlayURL || data.Mezzanine.FileURL,
							autoplay: true
						}).then(() => play())
					}
				} catch (e) {
					console.log(e)
				}
			})
		}

		return () => {
			return (
				<AppContainer>
					<NPlayer onMounte={el => mounte(el).finally(useHttpClientCloud)}></NPlayer>
				</AppContainer>
			)
		}
	}
})
</script>

<style lang="scss" scoped></style>
