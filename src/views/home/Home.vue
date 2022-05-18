<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { useProvider } from '@/hooks/hook-provider'
import { initPlayer } from '@/utils/utils-player'

export default defineComponent({
	name: 'Home',
	setup() {
		const { vars } = useProvider()
		const el = ref<HTMLElement | null>(null)
		onMounted(() => {
			initPlayer({
				el: el.value,
				url: `https://cloud.lisfes.cn/ffc459f3567e40b793e70d58bf0258f9/96f8fe5fb63c4ba184e1dfd3c5032e28-ab2cf1d2c6e8701c8a24e3bcd310f84f-hd.mp4?auth_key=1652959767-75bda1d74c074f8588c583f589f657e3-0-f444c004c6412d38713c7315e8b98f60`,
				cover: `https://oss.lisfes.cn/cloud/cover/2021-08/1628497707293.jpg`
			})
		})

		return () => {
			return (
				<AppContainer>
					<div ref={el} class="app-player"></div>
				</AppContainer>
			)
		}
	}
})
</script>

<style lang="scss" scoped>
.app-player {
	width: 1280px;
	height: 720px;
	margin: 15px auto;
	background-color: var(--card-color);
}
</style>
