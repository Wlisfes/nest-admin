<script lang="tsx">
import type { IMinute } from '@/api/pipe'
import { defineComponent, ref, nextTick, onUnmounted } from 'vue'
import { AppContainer } from '@/components/global'
import { httpClientMinute } from '@/api/service'
import { initMounte, moment } from '@/utils/utils-tool'
import { instance } from '@/utils/utils-watcher'

export default defineComponent({
	name: 'Minute',
	setup() {
		const page = ref<number>(1)
		const size = ref<number>(12)
		const total = ref<number>(0)
		const more = ref<boolean>(true)
		const loading = ref<boolean>(true)
		const dataSource = ref<Array<IMinute>>([])

		/**列表接口**/
		const httpMinute = async (compose?: boolean) => {
			try {
				loading.value = true
				const { data } = await httpClientMinute({ page: page.value, size: size.value })
				if (compose) {
					dataSource.value = dataSource.value.concat(data.list)
				} else {
					dataSource.value = data.list
				}

				total.value = data.total
				more.value = dataSource.value.length < total.value
			} catch (e) {}
			return (loading.value = false)
		}

		/**上拉加载**/
		const spinMinute = () => {
			const done = instance.observer.on('scroll', response => {
				if (response?.spin && !loading.value && more.value) {
					page.value++
					nextTick(() => httpMinute(true))
				}
			})
			onUnmounted(() => done())
		}

		initMounte(() => {
			httpMinute()
			spinMinute()
		})

		const initHundle = (url: string, icon: string) => {
			return (
				<n-el tag="a" href={url} target="_blank" class="scope-bundle">
					<u-icon name={icon} size={18}></u-icon>
				</n-el>
			)
		}

		return () => (
			<AppContainer
				class="app-pipe"
				loading={loading.value && total.value === 0}
				empty={!loading.value && total.value === 0}
			>
				{{
					empty: () => <u-empty space="40px 0" size={240}></u-empty>,
					placeholder: () => (
						<n-grid x-gap={20} y-gap={60} cols={3}>
							{[1, 2, 3].map(key => {
								return (
									<n-grid-item key={key} class="vnode-column">
										<n-card>
											<u-scale>
												<n-skeleton height="100%" width="100%" />
											</u-scale>
											<n-el class="vnode-column__title" tag="h1">
												<n-skeleton height="18" style={{ margin: '3px 0' }} />
											</n-el>
											<div class="vnode-column__desc">
												<n-skeleton height="14px" style={{ margin: '3px 0' }} />
												<n-skeleton height="14px" width="70%" style={{ margin: '3px 0' }} />
											</div>
											<n-el tag="div" class="vnode-column__bundle">
												{['36px', '65px', '18px', '18px', '18px', '18px'].map(px => (
													<div key={px} class="scope-bundle">
														<n-skeleton height="18px" width={px} />
													</div>
												))}
											</n-el>
										</n-card>
									</n-grid-item>
								)
							})}
						</n-grid>
					),
					default: () => (
						<n-grid x-gap={20} y-gap={60} cols={3}>
							{dataSource.value.map(item => {
								return (
									<n-grid-item key={item.id} class="vnode-column">
										<n-card>
											<u-scale>
												<n-image
													object-fit="cover"
													alt={item.name}
													preview-src={item.cover}
													src={`${item.cover}?x-oss-process=style/resize`}
												/>
											</u-scale>
											<n-el class="vnode-column__title" tag="h1">
												<n-ellipsis tooltip={false} line-clamp={1}>
													{item.name}
												</n-ellipsis>
											</n-el>
											<n-tooltip trigger="hover" width={350}>
												{{
													trigger: () => (
														<div class="vnode-column__desc">
															<n-ellipsis tooltip={false} line-clamp={2}>
																{item.description}
															</n-ellipsis>
														</div>
													),
													default: () => <span>{item.description}</span>
												}}
											</n-tooltip>
											<n-el tag="div" class="vnode-column__bundle">
												<div class="scope-bundle">
													<span>{item.user.nickname}</span>
												</div>
												<time datetime={item.createTime} class="scope-bundle">
													<span>{moment(item.createTime).format('YYYY-MM-DD')}</span>
												</time>
												{item.github && initHundle(item.github, 'antd-github-fill')}
												{item.url && initHundle(item.url, 'antd-link')}
												{item.npm && initHundle(item.npm, 'antd-medium')}
											</n-el>
										</n-card>
									</n-grid-item>
								)
							})}
						</n-grid>
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
	max-width: 1280px;
	padding: 0 15px;
	margin: 80px auto;
	box-sizing: border-box;
	.vnode-column {
		position: relative;
		:deep(.n-card) {
			height: 100%;
		}
		:deep(.n-card__content) {
			padding: 20px;
		}
		&__title {
			font-size: 18px;
			line-height: 24px;
			margin: 12px 0 8px;
			display: flex;
			flex-direction: column;
		}
		&__desc {
			height: 40px;
			display: flex;
			flex-direction: column;
			line-height: 20px;
			color: var(--text-color-3);
		}
		&__bundle {
			height: 20px;
			display: flex;
			align-items: center;
			font-size: 12px;
			margin-top: 10px;
			color: var(--text-color-3);
			.scope-bundle {
				display: flex;
				align-items: center;
				margin-right: 15px;
				cursor: pointer;
				text-decoration: none;
				i {
					color: var(--text-color-3);
				}
			}
		}
	}
}
</style>
