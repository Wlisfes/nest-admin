<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
	name: 'Parent',
	setup() {
		return () => {
			return <RouterView></RouterView>
		}
	}
})
</script>
