<script lang="tsx">
import type { ICloud } from '@/api/pipe'
import { defineComponent, ref, nextTick, onUnmounted } from 'vue'
import { AppContainer } from '@/components/global'
import { httpClientClouds } from '@/api/service'
import { initMounte } from '@/utils/utils-tool'
import { instance } from '@/utils/utils-watcher'

export default defineComponent({
	name: 'Client',
	setup() {
		const page = ref<number>(1)
		const size = ref<number>(12)
		const total = ref<number>(0)
		const more = ref<boolean>(true)
		const loading = ref<boolean>(true)
		const dataSource = ref<Array<ICloud>>([])

		/**列表接口**/
		const httpCloud = async (compose?: boolean) => {
			try {
				loading.value = true
				const { data } = await httpClientClouds({ page: page.value, size: size.value })
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

		/**滚动加载**/
		const spinBatter = () => {
			const done = instance.observer.on('scroll', response => {
				if (response?.spin && !loading.value && more.value) {
					page.value++
					nextTick(() => httpCloud(true))
				}
			})
			onUnmounted(() => done())
		}

		initMounte(() => {
			httpCloud()
			spinBatter()
		})

		return () => (
			<AppContainer
				class="app-pipe"
				loading={loading.value && total.value === 0}
				empty={!loading.value && total.value === 0}
			>
				{{
					empty: () => <u-empty space="40px 0" size={240}></u-empty>,
					placeholder: () => (
						<n-grid x-gap={20} y-gap={60} cols={4}>
							{[1, 2, 3, 4].map(key => {
								return (
									<n-grid-item key={key} class="vnode-column">
										<n-card>
											<u-scale>
												<n-skeleton height="100%" width="100%" />
											</u-scale>
											<div class="vnode-column__content">
												<div class="vnode-title">
													<n-skeleton height="14px" style={{ margin: '3px 0' }} />
													<n-skeleton height="14px" width="70%" style={{ margin: '3px 0' }} />
												</div>
												<div class="vnode-user">
													<n-skeleton circle height="28px" width="28px" />
													<div class="vnode-nickname">
														<n-skeleton height="20px" width="50%" />
													</div>
													{[1, 2, 3].map(n => (
														<div key={n} class="vnode-bundle">
															<n-skeleton height="20px" width="28px" />
														</div>
													))}
												</div>
											</div>
										</n-card>
									</n-grid-item>
								)
							})}
						</n-grid>
					),
					default: () => (
						<n-grid x-gap={20} y-gap={60} cols={4}>
							{dataSource.value.map(item => {
								return (
									<n-grid-item key={item.id} class="vnode-column">
										<n-card>
											<u-scale max-width={640}>
												<n-image
													object-fit="cover"
													alt={item.title}
													src={`${item.cover}?x-oss-process=style/resize`}
												/>
											</u-scale>
											<div class="vnode-column__content">
												<div class="vnode-title">
													<n-ellipsis tooltip={false} line-clamp={2}>
														{item.title}
													</n-ellipsis>
												</div>
												<div class="vnode-user">
													<u-scale scale={1 / 1} max-width={28}>
														<n-avatar
															round
															object-fit="cover"
															size={28}
															src={`${item.user.avatar}?x-oss-process=style/resize-1-1`}
														/>
													</u-scale>
													<div class="vnode-nickname">
														<n-ellipsis disabled line-clamp={1}>
															{item.user.nickname}
														</n-ellipsis>
													</div>
													<div class="vnode-bundle">
														<u-icon name="antd-eye" size={18}></u-icon>
														<span>{item.browse || 0}</span>
													</div>
													<div class="vnode-bundle">
														<u-icon name="antd-star" size={18}></u-icon>
														<span>{item.star.total || 0}</span>
													</div>
													<div class="vnode-bundle">
														<u-icon name="antd-comment" size={18}></u-icon>
														<span>{item.comment || 0}</span>
													</div>
												</div>
											</div>
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
	max-width: 1480px;
	padding: 0 15px;
	margin: 80px auto;
	box-sizing: border-box;
	:deep(.n-grid) {
		@media (max-width: 1280px) {
			grid-template-columns: repeat(3, minmax(0px, 1fr)) !important;
		}
		@media (max-width: 992px) {
			grid-template-columns: repeat(2, minmax(0px, 1fr)) !important;
		}
		@media (max-width: 640px) {
			grid-template-columns: repeat(1, minmax(0px, 1fr)) !important;
		}
	}
	.vnode-column {
		position: relative;
		:deep(.n-card) {
			height: 100%;
			border: none;
			border-radius: var(--n-border-radius);
			overflow: hidden;
			// transform: translate3d(0, 0, 0);
		}
		:deep(.n-card__content) {
			padding: 0;
		}
		&__content {
			padding: 0 12px;
			.vnode-title {
				height: 40px;
				display: flex;
				flex-direction: column;
				line-height: 20px;
				font-size: 12px;
				color: var(--text-color-3);
				margin: 10px 0;
			}
			.vnode-user {
				display: flex;
				overflow: hidden;
				color: var(--text-color-3);
				margin-bottom: 12px;
			}
			.vnode-nickname {
				overflow: hidden;
				flex: 1;
				line-height: 1.5;
				display: flex;
				align-items: center;
				margin-left: 10px;
			}
			.vnode-bundle {
				margin-left: 15px;
				display: flex;
				align-items: center;
				line-height: 1;
				> span {
					margin-left: 5px;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
