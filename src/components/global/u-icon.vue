<script lang="tsx">
import { defineComponent, computed, PropType, CSSProperties } from 'vue'
export default defineComponent({
	name: 'UIcon',
	props: {
		name: {
			type: String,
			required: true
		},
		size: {
			type: Number
		},
		color: {
			type: String
		},
		style: {
			type: Object as PropType<CSSProperties>,
			default: null
		}
	},
	setup(props) {
		const style = computed(() => {
			const u: CSSProperties = {}
			if (props.size) u.fontSize = props.size + 'px'
			if (props.color) u.color = props.color
			if (props.style) return { ...u, ...props.style }
			return u
		})

		return () => <i class={props.name} style={style.value}></i>
	}
})
</script>

<style lang="scss">
@import url('//at.alicdn.com/t/font_3325414_ifo3rd1jv5.css');

i[class^='antd-'],
i[class*='antd-'] {
	font-family: 'iconfont' !important;
	font-size: 16px;
	font-style: normal;
	line-height: 1;
	cursor: pointer;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
