import type { App } from 'vue'
import { ref, Fragment, defineComponent } from 'vue'
import MavonEditor from 'mavon-editor'
import ImagePreview, { ImagePreviewInst } from 'naive-ui/es/image/src/ImagePreview'

export const NPreview = defineComponent({
    name: 'NPreview',
    props: { value: String },
    setup(props) {
        const preview = ref<ImagePreviewInst>()

        /**图片自定义预览**/
        const onPreview = (el: HTMLImageElement) => {
            preview.value?.setPreviewSrc(el.src)
            preview.value?.setThumbnailEl(el)
            preview.value?.toggleShow()
        }

        return () => (
            <Fragment>
                {/* <ImagePreview show-toolbar-tooltip ref={preview} clsPrefix="editor"></ImagePreview> */}
                <mavon-editor
                    class="app-preview"
                    subfield={false}
                    toolbarsFlag={false}
                    autofocus={false}
                    shortCut={false}
                    boxShadow={false}
                    editable={false}
                    transition={false}
                    externalLink={{
                        markdown_css: () => {
                            return `https://cdn.jsdelivr.net/npm/mavon-editor@2.10.4/dist/markdown/github-markdown.min.css`
                        },
                        hljs_js: () => {
                            return `https://cdn.jsdelivr.net/npm/mavon-editor@2.10.4/dist/highlightjs/highlight.min.js`
                        },
                        hljs_css: (css: string) => {
                            return `https://cdn.jsdelivr.net/npm/mavon-editor@2.10.4/dist/highlightjs/styles/${css}.min.css`
                        },
                        hljs_lang: (lang: string) => {
                            return `https://cdn.jsdelivr.net/npm/mavon-editor@2.10.4/dist/highlightjs/languages/${lang}.min.js`
                        },
                        katex_css: () => {
                            return `https://cdn.jsdelivr.net/npm/mavon-editor@2.10.4/dist/katex/katex.min.css`
                        },
                        katex_js: () => {
                            return `https://cdn.jsdelivr.net/npm/mavon-editor@2.10.4/dist/katex/katex.min.js`
                        }
                    }}
                    tabSize={4}
                    defaultOpen="preview"
                    codeStyle="atom-one-dark"
                    model-value={props.value}
                    image-click={onPreview}
                ></mavon-editor>
            </Fragment>
        )
    }
})

export function setupEditor(app: App<Element>) {
    app.use(MavonEditor)
}
