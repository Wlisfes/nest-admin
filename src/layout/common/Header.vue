<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Header',
	setup() {
		return () => (
			<el-header class="app-header">
				<div class="app-header-trigger">
					<i class="antd-indent"></i>
				</div>
			</el-header>
		)
	}
})
</script>
<style lang="scss" scoped>
.app-header {
	padding: 0 20px 0 0;
	display: flex;
	align-items: center;
	&-trigger {
		padding: 0 12px;
		line-height: 60px;
		cursor: pointer;
	}
}
</style>
