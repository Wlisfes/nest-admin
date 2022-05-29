<script lang="tsx">
import { defineComponent, computed, PropType, CSSProperties, VNode } from 'vue'

export default defineComponent({
	name: 'AppContainer',
	props: {
		loading: {
			tyep: Boolean,
			default: false
		},
		empty: {
			tyep: Boolean,
			default: false
		},
		style: {
			type: Object as PropType<CSSProperties>,
			default: null
		},
		space: {
			type: String,
			default: ''
		}
	},
	setup(props, { slots }) {
		const style = computed(() => {
			const u: CSSProperties = {}
			if (props.space) u.padding = props.space
			if (props.style) return { ...u, ...props.style }
			return u
		})
		const RContent = () => {
			if (props.loading && slots.hasOwnProperty('placeholder')) {
				return (slots.placeholder?.() as unknown as VNode) || slots.default?.()
			}

			if (props.empty && slots.hasOwnProperty('empty')) {
				return (slots.empty?.() as unknown as VNode) || slots.default?.()
			}

			return slots.default?.() as unknown as VNode
		}
		return () => (
			<n-el tag="section" class="app-section" style={style.value}>
				<RContent></RContent>
			</n-el>
		)
	}
})
</script>

<style lang="scss" scoped>
.app-section {
	flex: 1;
	display: flex;
	flex-direction: column;
	z-index: 10;
	position: relative;
	overflow: hidden;
}
</style>
