<script lang="tsx">
import { defineComponent, ref, computed } from 'vue'
import { instance } from '@/utils/utils-watcher'

export default defineComponent({
	name: 'Multiple',
	setup() {
		instance.observer.on('scroll', response => {
			console.log(response)
		})

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
