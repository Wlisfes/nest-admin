<script lang="tsx">
import { defineComponent, ref, computed } from 'vue'
import { httpClientPartner } from '@/api/service'

export default defineComponent({
	name: 'Partner',
	setup() {
		const httpPartner = async () => {
			try {
				const { data } = await httpClientPartner({ page: 1, size: 10 })
				console.log(data)
			} catch (e) {}
		}

		httpPartner()
		return () => <div></div>
	}
})
</script>

<style lang="scss" scoped>
.app-base {
	flex: 1;
	display: flex;
	flex-direction: column;
	z-index: 10;
	position: relative;
	overflow: hidden;
}
</style>
