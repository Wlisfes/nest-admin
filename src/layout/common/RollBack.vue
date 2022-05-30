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
					<u-icon name="antd-vertical-align-top" size={26} />
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
	box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.12);
	background-color: var(--n-color);
}
</style>
