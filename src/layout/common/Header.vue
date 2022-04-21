<script lang="tsx">
import { defineComponent, computed, createVNode } from 'vue'
import { useUStore } from '@/store/modules/u-store'
import { useWatcher } from '@/utils/utils-watcher'
import { onReload } from '@/router'

export default defineComponent({
	name: 'Header',
	setup() {
		const store = useUStore()
		const client = useWatcher()
		const avatar = computed(() => {
			return new URL('/src/assets/resource/mini-logo.png', import.meta.url).href
		})

		const onTrigger = () => {
			if (store.device === 'MOBILE') {
			} else {
				store.setCollapse(!store.collapse)
			}
		}

		return () => (
			<n-layout-header class="app-header" style={{ height: '60px' }} bordered>
				<div class="vnode-trigger" onClick={onTrigger}>
					<u-icon name={store.collapse ? 'antd-indent' : 'antd-outdent'} size={20}></u-icon>
				</div>
				<div class="vnode-trigger" style={{ padding: '0 12px 0 5px' }} onClick={e => onReload()}>
					<u-icon name="antd-reload" size={20}></u-icon>
				</div>
				<div style={{ marginLeft: 'auto' }}></div>
				<n-popover trigger="click" style={{ maxWidth: '200px' }} placement="bottom">
					{{
						trigger: () => (
							<div class="vnode-bell">
								<el-badge is-dot>
									<u-icon name="antd-bell" size={24}></u-icon>
								</el-badge>
							</div>
						),
						default: () => (
							<div>
								{[1, 2, 3].map(key => (
									<div key={key} style={{ lineHeight: 1.7, fontSize: '16px', cursor: 'pointer' }}>
										<u-icon name="antd-sound"></u-icon>
										<span style={{ marginLeft: '10px' }}>这是一条新消息！</span>
									</div>
								))}
							</div>
						)
					}}
				</n-popover>
				<n-dropdown
					trigger="click"
					options={[
						{ label: '返回首页', key: 'home', icon: 'antd-bank' },
						{ label: '个人中心', key: 'user', icon: 'antd-user' },
						{ label: '退出登录', key: 'logout', icon: 'antd-logout' }
					]}
					render-icon={(props: { icon: string }) => <u-icon name={props.icon}></u-icon>}
				>
					<div class="vnode-user">
						<n-avatar round size={40} src={avatar.value} />
						<span style={{ marginLeft: '5px' }}>Admin</span>
					</div>
				</n-dropdown>
			</n-layout-header>
		)

		// return () => (
		// 	<el-header class="app-header">
		// 		<div class="app-header-trigger" onClick={onTrigger}>
		// 			<u-icon name={store.collapse ? 'antd-indent' : 'antd-outdent'} size={20}></u-icon>
		// 		</div>
		// 		<div class="app-header-trigger" style={{ paddingLeft: '5px' }}>
		// 			<u-icon name="antd-reload" size={20}></u-icon>
		// 		</div>
		// 		<div style={{ marginLeft: 'auto' }}></div>
		// 		<el-popover teleported={false} hide-after={0} width={200} placement="bottom" trigger="click">
		// 			{{
		// 				reference: () => (
		// 					<div class="app-bell">
		// 						<el-badge is-dot>
		// 							<u-icon name="antd-bell" size={24}></u-icon>
		// 						</el-badge>
		// 					</div>
		// 				),
		// 				default: () => (
		// 					<div>
		// 						{[1, 2, 3].map(key => (
		// 							<div key={key} style={{ lineHeight: 1.7, fontSize: '16px', cursor: 'pointer' }}>
		// 								<u-icon name="antd-sound"></u-icon>
		// 								<span style={{ marginLeft: '10px' }}>这是一条新消息！</span>
		// 							</div>
		// 						))}
		// 					</div>
		// 				)
		// 			}}
		// 		</el-popover>
		// 		<el-dropdown trigger="click" placement="bottom">
		// 			{{
		// 				default: () => (
		// 					<div class="app-user">
		// 						<el-avatar size={40} src={avatar.value}></el-avatar>
		// 						<span style={{ marginLeft: '5px' }}>妖雨纯</span>
		// 					</div>
		// 				),
		// 				dropdown: () => (
		// 					<el-dropdown-menu style={{ width: '120px' }}>
		// 						<el-dropdown-item
		// 							command="home"
		// 							icon={<u-icon name="antd-bank" />}
		// 							style={{ color: '#13c2c2' }}
		// 						>
		// 							返回首页
		// 						</el-dropdown-item>
		// 						<el-dropdown-item
		// 							command="user"
		// 							icon={<u-icon name="antd-user" />}
		// 							style={{ color: '#1890ff' }}
		// 						>
		// 							个人中心
		// 						</el-dropdown-item>
		// 						<el-dropdown-item
		// 							command="logout"
		// 							icon={<u-icon name="antd-logout" />}
		// 							style={{ color: '#f5222d' }}
		// 						>
		// 							退出登录
		// 						</el-dropdown-item>
		// 					</el-dropdown-menu>
		// 				)
		// 			}}
		// 		</el-dropdown>
		// 		<div class="app-setting">
		// 			<u-icon name="antd-setting" size={24}></u-icon>
		// 		</div>
		// 	</el-header>
		// )
	}
})
</script>
<style lang="scss" scoped>
.app-header {
	padding: 0 20px 0 0;
	display: flex;
	align-items: center;
	.vnode-trigger {
		padding: 0 12px;
		line-height: 60px;
		cursor: pointer;
	}
	.vnode-bell {
		height: 60px;
		padding: 0 5px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.vnode-user {
		display: flex;
		align-items: center;
		cursor: pointer;
		padding: 8px 15px 8px 15px;
	}
}
</style>
