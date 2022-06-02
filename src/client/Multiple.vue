<script lang="tsx">
import type { IPartner, IPoster } from '@/api/pipe'
import { defineComponent, ref, nextTick, onUnmounted } from 'vue'
import { AppContainer } from '@/components/global'
import { httpClientPartner } from '@/api/service'
import { initMounte } from '@/utils/utils-tool'

export default defineComponent({
	name: 'Multiple',
	setup() {
		const page = ref<number>(1)
		const size = ref<number>(10)
		const total = ref<number>(0)
		const more = ref<boolean>(true)
		const loading = ref<boolean>(true)
		const dataSource = ref<Array<IPartner>>([])

		return () => (
			<AppContainer
				class="app-pipe"
				loading={loading.value && total.value === 0}
				empty={!loading.value && total.value === 0}
			></AppContainer>
		)
	}
})
</script>

<style lang="scss" scoped>
.app-pipe {
	width: 100%;
	max-width: 1280px;
	padding: 0 15px;
	margin: 80px auto;
	box-sizing: border-box;
}
</style>
