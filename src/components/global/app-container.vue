<script lang="tsx">
import { defineComponent, computed, PropType, CSSProperties } from 'vue'

export default defineComponent({
	name: 'AppContainer',
	props: {
		style: {
			type: Object as PropType<CSSProperties>,
			default: null
		},
		space: {
			type: String,
			default: '0px'
		}
	},
	setup(props, { slots }) {
		const style = computed(() => {
			const u: CSSProperties = {}
			if (props.space) u.padding = props.space
			if (props.style) return { ...u, ...props.style }
			return u
		})
		return () => (
			<n-el tag="section" class="app-section" style={style.value}>
				{slots.default?.()}
			</n-el>
		)
	}
})
</script>

<style lang="scss" scoped>
.app-section {
	position: relative;
	flex: 1;
	display: flex;
	flex-direction: column;
	margin: 0 12px;
}
</style>
