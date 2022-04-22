<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useLoadingBar } from 'naive-ui'

const Component = defineComponent({
	name: 'AppProviderComponent',
	setup(props, { slots }) {
		window.$loading = useLoadingBar()

		return () => <Fragment>{slots.default?.()}</Fragment>
	}
})

export default defineComponent({
	name: 'AppProvider',
	setup(props, { slots }) {
		return () => (
			<n-loading-bar-provider>
				<n-dialog-provider>
					<n-notification-provider>
						<n-message-provider>
							<Component>{{ default: slots.default }}</Component>
						</n-message-provider>
					</n-notification-provider>
				</n-dialog-provider>
			</n-loading-bar-provider>
		)
	}
})
</script>
