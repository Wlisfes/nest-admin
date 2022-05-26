<script lang="tsx">
import { defineComponent, computed, Fragment, CSSProperties } from 'vue'

export default defineComponent({
	name: 'MaskCover',
	setup() {
		const layer = computed<CSSProperties>(() => ({
			transition: 'all 0.3s',
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		}))
		const cover = computed<CSSProperties>(() => ({
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: '50%',
			backgroundImage: `url('https://oss.lisfes.cn/cloud/stctic/1624934512799.jpg')`,
			zIndex: 1
		}))
		const mask = computed<CSSProperties>(() => ({
			opacity: 0.9,
			zIndex: 2,
			background: '-webkit-radial-gradient(50% 50%, ellipse closest-corner, transparent 10%, #07111b 90%)'
		}))

		return () => (
			<Fragment>
				<div style={{ ...layer.value, ...cover.value }}></div>
				<div style={{ ...layer.value, ...mask.value }}></div>
			</Fragment>
		)
	}
})
</script>
