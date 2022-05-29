<script lang="tsx">
import type { IPartner } from '@/api/pipe'
import { defineComponent, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { httpClientPartner } from '@/api/service'
import { initMounte } from '@/utils/utils-tool'

export default defineComponent({
	name: 'Partner',
	setup() {
		const page = ref<number>(1)
		const size = ref<number>(10)
		const total = ref<number>(0)
		const loading = ref<boolean>(true)
		const dataSource = ref<Array<IPartner>>([])

		const httpPartner = async () => {
			try {
				const { data } = await httpClientPartner({ page: 1, size: 10 })
				dataSource.value = data.list
				total.value = data.total
				console.log(dataSource.value)
			} catch (e) {}
			return (loading.value = false)
		}

		initMounte(() => {
			httpPartner()
		})

		return () => <AppContainer class="app-pipe"></AppContainer>
	}
})
</script>

<style lang="scss" scoped>
.app-pipe {
	padding: 0 15px;
}
</style>
