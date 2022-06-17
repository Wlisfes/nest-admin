<script lang="tsx">
import { defineComponent } from 'vue'
import { AppContainer } from '@/components/global'

export default defineComponent({
    name: 'Route',
    setup() {
        return () => {
            return <AppContainer>Route</AppContainer>
        }
    }
})
</script>

<style lang="scss" scoped></style>
