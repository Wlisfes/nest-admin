<script lang="tsx">
import { defineComponent } from 'vue'
import { Menu } from '@/layout/common'
import { useRoute } from 'vue-router'
import { useUStore } from '@/store/modules/u-store'

export default defineComponent({
	name: 'Aside',
	setup() {
		const route = useRoute()
		const store = useUStore()

		return () => <n-layout-sider bordered></n-layout-sider>

		// return () => {
		// 	return route.meta?.aside ?? true ? (
		// 		<el-aside class="app-aside" width={store.collapse ? '64px' : '220px'}>
		// 			<Menu current={store.current} collapse={store.collapse} dataSource={store.router}></Menu>
		// 		</el-aside>
		// 	) : null
		// }
	}
})
</script>
