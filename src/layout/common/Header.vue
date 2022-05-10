<script lang="tsx">
import { defineComponent, ref, computed, Fragment } from 'vue'
import { useAppStore } from '@/store/modules/app-store'
import { useWatcher } from '@/utils/utils-watcher'
import { delToken } from '@/utils/utils-cookie'
import { onReload, onEnter } from '@/router'
import { init } from '@/core/common/init-aside'
import { initSetup } from '@/core/common/init-setup'

const MiniAside = defineComponent({
	name: 'MiniAside',
	props: {
		visible: { type: Boolean, default: false }
	},
	emits: ['close'],
	setup(props, { emit }) {
		const app = useAppStore()

		const onSelecter = (path: string) => {
			onEnter(path)
			onClose()
		}

		const onClose = () => {
			console.log(1111)
			emit('close', false)
		}

		return () => (
			<n-drawer show={props.visible} width={220} placement="left" on-mask-click={onClose}>
				<n-drawer-content title="Admin" body-content-style={{ padding: 0 }}>
					<n-menu
						accordion
						root-indent={18}
						value={app.current}
						expanded-keys={app.expanded}
						collapsed={false}
						collapsed-width={64}
						options={app.router}
						on-update-value={onSelecter}
						onUpdateExpanded-keys={(keys: string[]) => app.setExpanded(keys)}
					/>
				</n-drawer-content>
			</n-drawer>
		)
	}
})

export default defineComponent({
	name: 'Header',
	setup() {
		const visible = ref<boolean>(false)
		const store = useAppStore()
		const client = useWatcher()
		const avatar = computed(() => {
			return 'https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg'
			// return new URL('/src/assets/resource/mini-logo.png', import.meta.url).href
		})

		const onTrigger = () => {
			if (store.device === 'MOBILE') {
				visible.value = true
			} else {
				store.setCollapse(!store.collapse)
			}
		}

		const onSelecter = (key: string) => {
			if (key === 'logout') {
				delToken().finally(() => {
					onEnter('/pipe/login')
				})
			}
		}

		//设置组件
		const onSetting = () => {
			initSetup()
		}

		return () => (
			<Fragment>
				<MiniAside visible={visible.value} onClose={value => (visible.value = value)} />
				<n-layout-header class="app-header" bordered>
					<div class="vnode-trigger" onClick={onTrigger}>
						<u-icon name={store.collapse ? 'antd-indent' : 'antd-outdent'} size={20}></u-icon>
					</div>
					<div class="vnode-trigger" onClick={e => onReload()}>
						<u-icon name="antd-reload" size={20}></u-icon>
					</div>
					<div style={{ flex: 1 }}></div>
					<div class="vnode-trigger">
						<u-icon name="antd-search" size={20}></u-icon>
					</div>
					<div class="vnode-trigger">
						<u-icon name="antd-github-fill" size={20}></u-icon>
					</div>
					<n-popover trigger="click" style={{ maxWidth: '200px' }} placement="bottom">
						{{
							trigger: () => (
								<div class="vnode-trigger">
									<u-icon name="antd-bell" color="#333639" size={22}></u-icon>
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
						{{
							default: () => (
								<div class="vnode-trigger">
									<n-avatar round size={36} src={avatar.value} />
								</div>
							)
						}}
					</n-dropdown>
					<div class="vnode-trigger" onClick={onSetting}>
						<u-icon name="antd-setting" size={20}></u-icon>
					</div>
				</n-layout-header>
			</Fragment>
		)
	}
})
</script>
<style lang="scss" scoped>
.app-header {
	height: 60px;
	padding: 0 20px 0 10px;
	display: flex;
	.vnode-trigger {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		position: relative;
		padding: 0 10px;
	}
}
</style>
