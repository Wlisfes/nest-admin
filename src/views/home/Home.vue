<script lang="tsx">
import { defineComponent } from 'vue'
import { AppContainer } from '@/components/global'
import { useProvider } from '@/hooks/hook-provider'
import { usePlayer, NPlayer } from '@/hooks/hook-player'
import { httpClientCloud, httpCloudCheck } from '@/api/service'

export default defineComponent({
	name: 'Home',
	setup() {
		const { vars } = useProvider()
		const { mounte, init, play } = usePlayer()

		const useHttpClientCloud = (id: number = 16) => {
			httpClientCloud({ id }).then(async ({ data: { key, cover } }) => {
				try {
					const { data } = await httpCloudCheck({ VideoId: key, AuthTimeout: 24 * 60 * 60 })
					if (data.list?.length > 0) {
						init({
							cover: cover || data.base.CoverURL,
							url: data.list[0].PlayURL,
							autoplay: true
						}).then(() => play())
					}
				} catch (e) {}
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
