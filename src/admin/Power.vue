<script lang="tsx">
import { defineComponent } from 'vue'
import { AppContainer } from '@/components/global'

export default defineComponent({
    name: 'Power',
    setup() {
        return () => {
            return <AppContainer>Power</AppContainer>
        }
    }
})
</script>

<style lang="scss" scoped></style>
