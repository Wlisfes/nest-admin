<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'

const useColumn = (props: RouteRecordRaw) => (
	<Fragment>
		{props.meta?.icon && <u-icon name="antd-home"></u-icon>}
		<span>{props.meta?.title}</span>
	</Fragment>
)

const SubItemColumn = defineComponent({
	name: 'SubItemColumn',
	props: {
		route: {
			type: Object as PropType<RouteRecordRaw>,
			required: true
		}
	},
	setup(props) {
		return () => {
			if (props.route.children?.length) {
				return (
					<el-sub-menu index={props.route.path}>
						{{
							title: () => useColumn(props.route),
							default: () => (props.route.children || []).map(item => <SubItemColumn route={item} />)
						}}
					</el-sub-menu>
				)
			}
			return <el-menu-item index={props.route.path}>{{ title: () => useColumn(props.route) }}</el-menu-item>
		}
	}
})

const SubColumn = defineComponent({
	name: 'SubColumn',
	props: {
		route: {
			type: Object as PropType<RouteRecordRaw>,
			required: true
		}
	},
	setup(props) {
		return () => {
			if (props.route.meta?.hidden) {
				return null
			}
			if (props.route.meta?.root) {
				return (props.route.children || []).map(item => {
					return <el-menu-item index={item.path}>{{ title: () => useColumn(item) }}</el-menu-item>
				})
			}
			return (
				<el-sub-menu index={props.route.path}>
					{{
						title: () => useColumn(props.route),
						default: () => (props.route.children || []).map(item => <SubItemColumn route={item} />)
					}}
				</el-sub-menu>
			)
		}
	}
})

export default defineComponent({
	name: 'Menu',
	props: {
		current: {
			type: String,
			default: ''
		},
		dataSource: {
			type: Array as PropType<RouteRecordRaw[]>,
			default: () => []
		},
		collapse: {
			type: Boolean,
			default: false
		},
		transition: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		const router = useRouter()
		const logo = computed(() => {
			if (props.collapse) return new URL('/src/assets/resource/mini-logo.png', import.meta.url).href
			return new URL('/src/assets/resource/large-logo.png', import.meta.url).href
		})

		const onSelecter = (path: string) => {
			props.current !== path && router.push(path)
		}

		return () => (
			<div class="app-menu">
				<div class="app-menu-logo" onClick={e => onSelecter('/home')}>
					{props.collapse ? (
						<img style={{ width: '50px', display: 'block' }} src={logo.value} />
					) : (
						<img style={{ width: '218px', display: 'block' }} src={logo.value} />
					)}
				</div>
				<el-scrollbar class="app-menu-wrapper">
					<el-menu
						text-color="#373840"
						active-text-color="#1B73FA"
						default-active={props.current}
						collapse={props.collapse}
						collapse-transition={props.transition}
						unique-opened={true}
						onSelect={onSelecter}
					>
						{{ default: () => props.dataSource.map(item => <SubColumn route={item} />) }}
					</el-menu>
				</el-scrollbar>
			</div>
		)
	}
})
</script>

<style lang="scss" scoped>
.app-menu {
	flex: 1;
	height: 100%;
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	border-right: 1px solid #f1f1f182;
	&-wrapper {
		flex: 1;
		overflow-x: hidden;
		// :deep(.el-scrollbar__view) {
		// 	flex: 1;
		// 	display: flex;
		// 	flex-direction: column;
		// 	overflow: hidden;
		// }
		// :deep(.el-scrollbar__wrap) {
		// 	.el-scrollbar__wrap {
		// 		overflow-x: hidden;
		// 		margin-bottom: 0 !important;
		// 	}
		// }
	}
	&-logo {
		position: relative;
		height: 60px;
		line-height: 60px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	:deep(.el-menu) {
		border-right: none;
	}
	:deep(.el-submenu) {
		margin-top: 6px;
	}
	:deep(.el-submenu__title, .el-menu-item) {
		height: 42px;
		line-height: 42px;
		position: relative;
		&.is-active {
			background-color: #ecf5ff;
		}
	}
}
</style>
