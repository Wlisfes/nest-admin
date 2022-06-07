export { default as MdEditor } from 'md-editor-v3'
import { ref, onMounted, defineComponent, computed, CSSProperties } from 'vue'
import { useDvcStore } from '@/store/modules/dvc-store'

export function useEditor() {
	const dvc = useDvcStore()
	const preview = ref('app-editor-preview')
	const theme = computed(() => dvc.theme)

	return { theme, preview }
}
