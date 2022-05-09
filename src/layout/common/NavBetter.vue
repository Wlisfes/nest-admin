<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue'
import { useThemeVars } from 'naive-ui'
import { useAppStore } from '@/store/modules/app-store'
import { onEnter } from '@/router'
import BScroll, { BScrollInstance } from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(MouseWheel)

export default defineComponent({
	name: 'NavBetter',
	setup() {
		const store = useAppStore()
		const wrapper = ref<HTMLElement>()
		const better = ref<BScrollInstance>()

		const initBScroll = () => {
			better.value = new BScroll(wrapper.value as HTMLElement, {
				scrollX: true,
				scrollY: false,
				mouseWheel: true
			})
		}

		onMounted(() => {
			initBScroll()
			console.log(useThemeVars())
		})

		return () => (
			<n-el tag="div" class="app-nav">
				<div ref={wrapper} class="wrapper">
					<div class="wrapper-container">
						{store.multiple.map(item => (
							<div class="wrapper-column" key={item.key}>
								<n-el tag="div" class="wrapper-column-scope">
									<span style={{ marginRight: '4px' }}>{item.meta.title}</span>
									<u-icon name="antd-close" style={{ marginRight: '-2px' }}></u-icon>
								</n-el>
							</div>
						))}
					</div>
				</div>
			</n-el>
		)
	}
})
</script>

<style lang="scss" scoped>
.app-nav {
	position: relative;
	background-color: var(--primary-grey-color);
	padding: 5px 10px;
	.wrapper {
		white-space: nowrap;
		overflow: hidden;
		&-container {
			display: inline-block;
		}
		.wrapper-column {
			display: inline-block;
			&-scope {
				position: relative;
				line-height: 32px;
				padding: 0 10px;
				margin-right: 10px;
				cursor: pointer;
				display: flex;
				align-items: center;
				color: var(--text-color);
				font-size: var(--font-size);
				background-color: var(--card-color);
				border-radius: var(--border-radius);
				transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
				&:hover {
					color: var(--primary-color);
				}
			}
		}
	}
}
</style>
