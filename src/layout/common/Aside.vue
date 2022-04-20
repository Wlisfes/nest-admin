<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { Menu } from '@/layout/common'
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
			return route.meta?.aside ?? true ? (
				<el-aside v-show={device.value} class="app-aside" width={collapse.value ? '64px' : '220px'}>
					<Menu current={current.value} collapse={collapse.value} dataSource={dataSource.value}></Menu>
				</el-aside>
			) : null
		}
	}
})
</script>

<style lang="scss" scoped>
.app-aside {
	overflow: hidden;
	transition: all 0.15s;
}
</style>
