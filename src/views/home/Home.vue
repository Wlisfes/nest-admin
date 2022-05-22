<script lang="tsx">
import { defineComponent } from 'vue'
import { AppContainer } from '@/components/global'
import { useProvider } from '@/hooks/hook-provider'
import { usePlayer, NPlayer } from '@/hooks/hook-player'
import { httpClientCloud, httpCloudCheck } from '@/api'

export default defineComponent({
	name: 'Home',
	setup() {
		const { vars } = useProvider()
		const { mounte, init, play } = usePlayer()

		const useHttpClientCloud = () => {
			httpClientCloud({ id: 16 }).then(async response => {
				try {
					const { data } = await httpCloudCheck({
						VideoId: response.data.key,
						AuthTimeout: 24 * 60 * 60
					})
					if (data.list.length > 0) {
						const node = data.list.shift()
						init({
							cover: response.data.cover || data.base.CoverURL,
							url: node.PlayURL,
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
					<div></div>
				</AppContainer>
			)
		}
	}
})
</script>

<style lang="scss" scoped></style>
