<script lang="tsx">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
	name: 'Minute',
	setup() {
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
