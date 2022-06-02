<script lang="tsx">
import type { ICloud } from '@/api/pipe'
import { defineComponent, ref, nextTick, onUnmounted } from 'vue'
import { AppContainer } from '@/components/global'
import { httpClientClouds } from '@/api/service'
import { initMounte } from '@/utils/utils-tool'
import { instance } from '@/utils/utils-instance'

export default defineComponent({
	name: 'Player',
	setup() {
		return () => {
			return <div class="app-pipe"></div>
		}
	}
})
</script>

<style lang="scss" scoped></style>
