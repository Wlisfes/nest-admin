<script lang="tsx">
import { defineComponent } from 'vue'
import { useLoadingBar } from 'naive-ui'

export default defineComponent({
	name: 'Home',
	setup() {
		const loadingBar = useLoadingBar()
		const onCompute = () => {
			loadingBar.start()
			setTimeout(() => loadingBar.finish(), 200)
		}

		return () => {
			return (
				<div>
					<n-button onClick={onCompute}>Compute</n-button>
				</div>
			)
		}
	}
})
</script>
