<script lang="tsx">
import { defineComponent, ref, computed } from 'vue'
import { instance } from '@/utils/utils-watcher'
import { useLocale } from '@/lang'

export default defineComponent({
	name: 'Multiple',
	setup() {
		const { t, onChange, locale } = useLocale()
		instance.observer.on('scroll', response => {
			console.log(response)
		})

		return () => (
			<div>
				<n-button onClick={() => onChange(locale.value === 'en' ? 'zh' : 'en')}>{t('name')}</n-button>
				{Object.keys([...Array(20)]).map(k => (
					<h1 key={k}>{k}</h1>
				))}
			</div>
		)
	}
})
</script>

<style lang="scss" scoped>
.app-base {
	flex: 1;
	display: flex;
	flex-direction: column;
	z-index: 10;
	position: relative;
	overflow: hidden;
}
</style>
