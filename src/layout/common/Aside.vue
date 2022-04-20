<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUStore } from '@/store/modules/u-store'

export default defineComponent({
	name: 'Aside',
	setup() {
		const route = useRoute()
		const store = useUStore()
		const device = computed(() => store.device)
		const collapse = computed(() => store.collapse)
		const current = computed(() => store.current)
		const dataSource = computed(() => store.router)

		return () => {
			return (
				<el-aside v-show={device.value} class="app-aside" width={collapse.value ? '64px' : '220px'}></el-aside>
			)
		}
	}
})
</script>
