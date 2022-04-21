<script lang="tsx">
import { defineComponent, computed } from 'vue'
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

		const onSelecter = (key: string) => {
			console.log(key)
			// if (key === 'logout') {
			// 	delToken().finally(() => {
			// 		router.push('/main/login')
			// 	})
			// }
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
									<u-icon name="antd-bell" size={22}></u-icon>
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
					options={[
						{ label: '返回首页', key: 'home', icon: 'antd-bank', color: '#13c2c2' },
						{ label: '个人中心', key: 'user', icon: 'antd-user', color: '#1890ff' },
						{ label: '退出登录', key: 'logout', icon: 'antd-logout', color: '#f5222d' }
					]}
					render-icon={(u: any) => <u-icon name={u.icon} color={u.color}></u-icon>}
					render-label={(u: any) => <span style={{ color: u.color }}>{u.label}</span>}
					show-arrow
					trigger="click"
					onSelect={onSelecter}
				>
					<div class="vnode-user">
						<n-avatar round size={40} src={avatar.value} />
						<span style={{ marginLeft: '5px' }}>Admin</span>
					</div>
				</n-dropdown>
				<div class="vnode-setting">
					<u-icon name="antd-setting" size={22}></u-icon>
				</div>
			</n-layout-header>
		)
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
	.vnode-setting {
		height: 60px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
}
</style>
