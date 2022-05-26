<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Layer',
	setup() {
		return () => <n-layout style={{ height: '100%' }} has-sider></n-layout>
	}
})
</script>
