<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
	name: 'BarLink',
	setup() {
		return () => (
			<Fragment>
				<div class="vnode-target">
					<u-icon name="antd-menu" size={22} color="#fff"></u-icon>
				</div>
				<ul class="vnode-link">
					<li class="link">
						<RouterLink to="/">🍎 首页</RouterLink>
					</li>
					<li class="link">
						<RouterLink to="/admin">🍀 归档</RouterLink>
					</li>
					<li class="link">
						<RouterLink to="/client">🍓 视频</RouterLink>
					</li>
					<li class="link">
						<RouterLink to="/minute">🍒 收录</RouterLink>
					</li>
					<li class="link">
						<RouterLink to="/partner">🍄 生活</RouterLink>
					</li>
				</ul>
			</Fragment>
		)
	}
})
</script>

<style lang="scss" scoped>
.vnode-target {
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 9;
	padding: 0 12px;
	cursor: pointer;
	transition: all 0.3s;
	transform: translateX(-100%);
	@media (max-width: 780px) {
		transform: translateX(0);
	}
}
.vnode-link {
	height: 100%;
	margin: 0;
	padding: 0;
	display: flex;
	transition: all 0.3s;
	position: absolute;
	left: 0;
	top: 0;
	overflow: hidden;
	z-index: 9;
	@media (max-width: 780px) {
		transform: translateY(-100%);
	}
	.link {
		list-style: none;
		padding: 0 10px;
		display: flex;
		align-items: center;
		font-size: 16px;
		line-height: 1.5;
		a {
			color: rgba(255, 255, 255, 0.8);
			position: relative;
			padding: 3px 0;
			border-bottom: 2px solid rgba(0, 0, 0, 0);
			transition: all 0.3s;
			padding-right: 5px;
			text-decoration: none;
			&.router-link-active {
				color: #ffffff;
				border-color: #ffffff;
			}
		}
	}
}
</style>
