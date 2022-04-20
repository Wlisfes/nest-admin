<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Home',
	setup() {
		return () => {
			return (
				<div>
					<div>
						<el-button>Compute</el-button>
					</div>
				</div>
			)
		}
	}
})
</script>
