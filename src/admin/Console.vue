<script lang="tsx">
import { defineComponent } from 'vue'
import { AppContainer } from '@/components/global'

export default defineComponent({
    name: 'Console',
    setup() {
        return () => {
            return <AppContainer>Console</AppContainer>
        }
    }
})
</script>

<style lang="scss" scoped></style>
