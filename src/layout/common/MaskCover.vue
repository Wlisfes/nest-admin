<script lang="tsx">
import { defineComponent, onMounted, onUnmounted, computed, watch, Fragment, CSSProperties } from 'vue'
import { useAppStore } from '@/store/modules/app-store'

export default defineComponent({
    name: 'MaskCover',
    emits: ['change'],
    setup(props, { emit }) {
        const app = useAppStore()
        const current = computed(() => app.banner[app.index] || null)
        const layer = computed<CSSProperties>(() => ({
            transition: 'all 0.3s',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }))
        const cover = computed<CSSProperties>(() => {
            const paper = current.value?.cover || 'https://oss.lisfes.cn/cloud/stctic/1624934512799.jpg'
            return {
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: '50%',
                backgroundImage: `url('${paper}')`,
                zIndex: 1
            }
        })
        const mask = computed<CSSProperties>(() => ({
            opacity: 0.9,
            zIndex: 2,
            background: '-webkit-radial-gradient(50% 50%, ellipse closest-corner, transparent 10%, #07111b 90%)'
        }))
        const onChange = () => {
            emit('change', current.value)
        }
        const done = watch(
            () => current.value,
            () => onChange()
        )

        onMounted(onChange)
        onUnmounted(done)

        return () => (
            <Fragment>
                <div style={{ ...layer.value, ...cover.value }}></div>
                <div style={{ ...layer.value, ...mask.value }}></div>
            </Fragment>
        )
    }
})
</script>
