<script lang="tsx">
import { defineComponent, computed, CSSProperties } from 'vue'

export default defineComponent({
	name: 'UScale',
	props: {
		maxWidth: { type: Number, default: () => 540 },
		scale: { type: Number, default: () => 16 / 9 }
	},
	setup(props, { slots }) {
		const max = computed<CSSProperties>(() => ({
			maxWidth: props.maxWidth + 'px'
		}))
		const compute = computed<CSSProperties>(() => ({
			paddingBottom: 100 / props.scale + '%'
		}))

		return () => (
			<div class="max-scale" style={max.value}>
				<div class="max-scale__compute" style={compute.value}>
					<div class="max-scale__column">{slots.default?.()}</div>
				</div>
			</div>
		)
	}
})
</script>

<style lang="scss" scoped>
.max-scale {
	width: 100%;
	&__compute {
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	&__column {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		:deep(.n-image) img {
			width: 100%;
			display: block;
		}
	}
}
</style>
