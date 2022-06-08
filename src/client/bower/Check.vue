<script lang="tsx">
import type { IArticle } from '@/api/pipe'
import { defineComponent, ref, nextTick, onUnmounted, Fragment } from 'vue'
import { useRoute } from 'vue-router'
import { AppContainer } from '@/components/global'
import { httpClientArticle } from '@/api/service'
import { initMounte } from '@/utils/utils-tool'
import { NPreview } from '@/hooks/hook-editor'

export default defineComponent({
	name: 'Check',
	setup() {
		const route = useRoute()
		const node = ref<IArticle>()
		const loading = ref<boolean>(true)
		const html = ref()

		/**文章详情**/
		const httpArticle = async () => {
			try {
				const { data } = await httpClientArticle({ id: route.params.id as unknown as number })
				node.value = data
			} catch (e) {}
			return (loading.value = false)
		}

		initMounte(() => {
			httpArticle()
		})

		return () => (
			<AppContainer class="app-pipe">
				{{
					default: () => (
						<n-card class="vnode-column">
							<h1 class="vnode-column__title">{node.value?.title}</h1>
							<NPreview value={node.value?.content}></NPreview>
						</n-card>
					)
				}}
			</AppContainer>
		)
	}
})
</script>

<style lang="scss" scoped>
.app-pipe {
	width: 100%;
	max-width: 1080px;
	padding: 0 15px;
	margin: 20px auto;
	box-sizing: border-box;
}

.vnode-column {
	:deep(.n-card__content) {
		padding: 20px;
	}

	&__title {
		font-size: 28px;
		font-weight: 700;
		margin: 0 0 20px;
	}
}
</style>
