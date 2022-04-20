<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
	name: 'App',
	setup() {
		return () => {
			return (
				<el-config-provider size="default" z-index={3000}>
					<RouterView></RouterView>
				</el-config-provider>
			)
		}
	}
})
</script>
