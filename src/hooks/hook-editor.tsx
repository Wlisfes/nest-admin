import type { App } from 'vue'
import MavonEditor from 'mavon-editor'
import { ref, onMounted, defineComponent, computed, CSSProperties } from 'vue'
import { useDvcStore } from '@/store/modules/dvc-store'

export const NPreview = defineComponent({
	name: 'NPreview',
	props: { value: String },
	setup(props) {
		const preview = ref<HTMLElement>()
		const dvc = useDvcStore()

		/**删除无用help容器**/
		const onRemove = () => {
			const el = preview.value as unknown as { $refs: { help: HTMLElement } }
			el.$refs.help.remove()
		}

		onMounted(() => onRemove())

		return () => (
			<mavon-editor
				class="app-preview"
				ref={preview}
				subfield={false}
				toolbarsFlag={false}
				autofocus={false}
				shortCut={false}
				boxShadow={false}
				editable={false}
				transition={false}
				tabSize={4}
				defaultOpen="preview"
				codeStyle="atom-one-dark"
				model-value={props.value}
			></mavon-editor>
		)
	}
})

export function setupEditor(app: App<Element>) {
	app.use(MavonEditor)
}
