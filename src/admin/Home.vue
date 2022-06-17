<script lang="tsx">
import { defineComponent } from 'vue'
import { AppContainer } from '@/components/global'

export default defineComponent({
    name: 'Home',
    setup() {
        return () => {
            return <AppContainer>Home</AppContainer>
        }
    }
})
</script>

<style lang="scss" scoped></style>
