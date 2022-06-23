<script lang="tsx">
import { defineComponent } from 'vue'
import { AppContainer } from '@/components/global'

export default defineComponent({
    name: 'User',
    setup() {
        return () => {
            return (
                <AppContainer class="app-pipe" space="10px">
                    <n-form class="is-customize" inline show-label={false} show-feedback={false}>
                        <div class="app-inline space-660">
                            <n-form-item>
                                <n-select placeholder="用户角色" style={{ width: '150px' }} />
                            </n-form-item>
                            <n-form-item>
                                <n-select
                                    clearable
                                    options={['已禁用', '已启用', '已删除'].map((x, v) => ({ label: x, value: v }))}
                                    placeholder="用户状态"
                                    style={{ width: '150px' }}
                                />
                            </n-form-item>
                        </div>
                        <div class="app-inline space-580">
                            <n-form-item>
                                <n-input placeholder="关键字" style={{ width: '260px' }} />
                            </n-form-item>
                        </div>
                        <n-form-item>
                            <n-button type="info" secondary>
                                查 找
                            </n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="warning" secondary>
                                重 置
                            </n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="success" secondary>
                                新 增
                            </n-button>
                        </n-form-item>
                    </n-form>
                </AppContainer>
            )
        }
    }
})
</script>

<style lang="scss" scoped>
.app-pipe {
    margin: 0 12px 12px;
    z-index: 0;
    background-color: var(--card-color);
}
</style>
