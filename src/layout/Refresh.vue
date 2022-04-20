<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Parent',
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$router.replace(to.query.url as string)
		})
	},
	setup() {
		return () => {
			return null
		}
	}
})
</script>
