<script lang="tsx">
import { defineComponent, ref, computed } from 'vue'
import { AppContainer } from '@/components/global'
import { useAppStore } from '@/store/modules/app-store'
import { moment } from '@/utils/utils-tool'

type ICurrent = {
	target: HTMLButtonElement
}

export default defineComponent({
	name: 'Home',
	setup() {
		const app = useAppStore()
		const current = computed(() => app.banner[app.index] || null)
		const time = ref(moment().format('HH:mm:ss'))
		const date = computed(() => {
			return {
				time: moment().format('YYYY-MM-DD'),
				week: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][moment().get('d')]
			}
		})
		setInterval(() => (time.value = moment().format('HH:mm:ss')))

		const onCurrent = (e: ICurrent, fn: Function) => {
			e.target.disabled = true
			fn().finally(
				setTimeout(() => {
					e.target.disabled = false
				}, 100)
			)
		}

		return () => (
			<AppContainer class="app-pipe">
				<div class="app-pipe__center">
					<div class="vnode-clock">
						<div class="vnode-clock__date">{`${date.value.time} ${date.value.week}`}</div>
						<div class="vnode-clock__time">{time.value}</div>
						<div class="vnode-clock__name vnode-clock__date" style={{ minHeight: '76px' }}>
							{current.value?.name}
						</div>
					</div>
				</div>
				<div class="app-pipe__operate">
					<n-space size={15}>
						<n-el
							tag="a"
							title={current.value?.name}
							href={current.value?.search}
							class="vnode-block"
							target="_blank"
						>
							<u-icon name="antd-location" size={20}></u-icon>
						</n-el>
						<n-el
							tag="button"
							title="上一页"
							class="vnode-block"
							onClick={(e: ICurrent) => onCurrent(e, app.prevBanner)}
						>
							<u-icon name="antd-left" size={20}></u-icon>
						</n-el>
						<n-el
							tag="button"
							title="下一页"
							class="vnode-block"
							onClick={(e: ICurrent) => onCurrent(e, app.nextBanner)}
						>
							<u-icon name="antd-right" size={20}></u-icon>
						</n-el>
					</n-space>
				</div>
				<div class="app-pipe__footer">
					<span>Cloud Ant Design ©2022 Created by Wlisfes</span>
					<a href="https://beian.miit.gov.cn" target="_blank">
						粤ICP备18016996号-1
					</a>
				</div>
			</AppContainer>
		)
	}
})
</script>

<style lang="scss" scoped>
.app-pipe {
	&__center {
		flex: 1 1 0%;
		display: flex;
		align-items: center;
		justify-content: center;
		.vnode-clock {
			font-family: Share Tech Mono, monospace;
			text-align: center;
			color: #daf6ff;
			text-shadow: 0 0 20px #0aafe6, 0 0 20px rgb(10 175 230 / 0%);
			&__date {
				letter-spacing: 0.1em;
				font-size: 24px;
				transition: all 0.3s;
				line-height: 38px;
			}
			&__time {
				letter-spacing: 0.05em;
				font-size: 80px;
				transition: all 0.3s;
			}
			&__name {
				max-width: 992px;
				margin: 0 20px;
			}
		}
	}

	&__operate {
		display: flex;
		justify-content: flex-end;
		padding: 20px 140px;
		transition: all 0.3s;
		@media (max-width: 992px) {
			padding: 20px;
		}
		.vnode-block {
			width: 44px;
			height: 44px;
			border-radius: 4px;
			background-color: rgba(50, 50, 50, 0.9);
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			transition: all 0.3s;
			color: #ffffff;
			text-decoration: none;
			overflow: none;
			border: none;
			padding: 0;
		}
	}

	&__footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		padding: 5px;
		span,
		a {
			font-size: 12px;
			color: hsla(0, 0%, 100%, 0.5);
			margin: 0 5px;
			cursor: pointer;
			text-decoration: none;
		}
	}
}
</style>
