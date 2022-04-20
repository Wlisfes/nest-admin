<script lang="tsx">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'Template',
	setup() {
		const route = useRoute()
		return () => {
			return (
				<div>
					{route.meta?.title ?? 'Template'}
					{Object.keys([...Array(10)]).map(item => (
						<h1 key={item}>{item}</h1>
					))}
				</div>
			)
		}
	}
})
</script>
