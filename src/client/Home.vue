<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Home',
	setup() {
		return () => (
			<div>
				{Object.keys([...Array(20)]).map(k => (
					<h1 key={k}>{k}</h1>
				))}
			</div>
		)
	}
})
</script>
