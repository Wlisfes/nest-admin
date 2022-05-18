<script lang="tsx">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { AppContainer } from '@/components/global'

export default defineComponent({
	name: 'Template',
	setup() {
		const route = useRoute()
		return () => {
			return (
				<AppContainer>
					{route.meta?.title ?? 'Template'}
					{Object.keys([...Array(10)]).map(item => (
						<h1 key={item}>{item}</h1>
					))}
				</AppContainer>
			)
		}
	}
})
</script>
