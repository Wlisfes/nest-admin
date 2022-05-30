<script lang="tsx">
import { defineComponent, Transition } from 'vue'

export default defineComponent({
	name: 'RollBack',
	props: {
		visible: {
			type: Boolean,
			default: false
		}
	},
	emits: ['touch'],
	setup(props, { emit }) {
		return () => (
			<Transition name="fade" mode="out-in" appear>
				<n-el class="app-back" v-show={props.visible} onClick={() => emit('touch')}>
					<i class="n-base-icon">
						<svg viewBox="0 0 24 24">
							<g stroke="none" stroke-width="1" fill-rule="evenodd">
								<g transform="translate(-139.000000, -4423.000000)" fill-rule="nonzero">
									<g transform="translate(120.000000, 4285.000000)">
										<g transform="translate(7.000000, 126.000000)">
											<g transform="translate(24.000000, 24.000000) scale(1, -1) translate(-24.000000, -24.000000) translate(12.000000, 12.000000)">
												<g transform="translate(4.000000, 2.000000)">
													<path d="M8,0 C8.51283584,0 8.93550716,0.38604019 8.99327227,0.883378875 L9,1 L9,10.584 L12.2928932,7.29289322 C12.6834175,6.90236893 13.3165825,6.90236893 13.7071068,7.29289322 C14.0675907,7.65337718 14.0953203,8.22060824 13.7902954,8.61289944 L13.7071068,8.70710678 L8.70710678,13.7071068 L8.62544899,13.7803112 L8.618,13.784 L8.59530661,13.8036654 L8.4840621,13.8753288 L8.37133602,13.9287745 L8.22929083,13.9735893 L8.14346259,13.9897165 L8.03324678,13.9994506 L7.9137692,13.9962979 L7.77070917,13.9735893 L7.6583843,13.9401293 L7.57677845,13.9063266 L7.47929125,13.8540045 L7.4048407,13.8036865 L7.38131006,13.7856883 C7.35030318,13.7612383 7.32077858,13.7349921 7.29289322,13.7071068 L2.29289322,8.70710678 L2.20970461,8.61289944 C1.90467972,8.22060824 1.93240926,7.65337718 2.29289322,7.29289322 C2.65337718,6.93240926 3.22060824,6.90467972 3.61289944,7.20970461 L3.70710678,7.29289322 L7,10.585 L7,1 L7.00672773,0.883378875 C7.06449284,0.38604019 7.48716416,0 8,0 Z"></path>
													<path d="M14.9333333,15.9994506 C15.5224371,15.9994506 16,16.4471659 16,16.9994506 C16,17.5122865 15.5882238,17.9349578 15.0577292,17.9927229 L14.9333333,17.9994506 L1.06666667,17.9994506 C0.477562934,17.9994506 0,17.5517354 0,16.9994506 C0,16.4866148 0.411776203,16.0639435 0.9422708,16.0061783 L1.06666667,15.9994506 L14.9333333,15.9994506 Z"></path>
												</g>
											</g>
										</g>
									</g>
								</g>
							</g>
						</svg>
					</i>
				</n-el>
			</Transition>
		)
	}
})
</script>

<style lang="scss" scoped>
.app-back {
	width: 44px;
	height: 44px;
	position: fixed;
	right: 40px;
	bottom: 40px;
	border-radius: 22px;
	z-index: 10;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.3);
	background-color: var(--n-color);
	&:hover .n-base-icon {
		color: var(--primary-color-hover);
	}
	.n-base-icon {
		height: 1em;
		width: 1em;
		line-height: 1em;
		text-align: center;
		display: inline-block;
		position: relative;
		fill: currentColor;
		transform: translateZ(0);
		font-size: 26px;
		color: var(--text-color-2);
		transition: color 0.3s var(--n-bezier);
	}
}
</style>
