<script lang="tsx">
import type { IUser } from '@/api/pipe'
import { defineComponent, ref, h } from 'vue'
import { AppContainer } from '@/components/global'
import { httpColumnUser } from '@/api/service'
import { initMounte } from '@/utils/utils-tool'

export default defineComponent({
    name: 'User',
    setup() {
        const page = ref<number>(1)
        const size = ref<number>(10)
        const total = ref<number>(0)
        const loading = ref<boolean>(true)
        const dataSource = ref<Array<IUser>>([])
        const dataColumn = ref([
            { title: '账号', key: 'account', minWidth: 120 },
            { title: '头像', key: 'avatar', width: 100 },
            { title: '昵称', key: 'nickname', width: 120 },
            { title: '邮箱', key: 'email' },
            { title: '手机号', key: 'mobile' },
            { title: '注册时间', key: 'createTime' }
        ])

        const fecthColumnUser = async () => {
            try {
                loading.value = true
                const { data } = await httpColumnUser({ page: page.value, size: size.value }).finally(() => {
                    loading.value = false
                })

                total.value = data.total
                dataSource.value = data.list
            } catch (e) {}
        }

        initMounte(() => {
            fecthColumnUser()
        })

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
                    <n-data-table
                        style={{ flex: 1 }}
                        bordered={false}
                        flex-height={true}
                        loading={loading.value}
                        row-key={(row: IUser) => row.id}
                        columns={dataColumn.value}
                        data={dataSource.value}
                        pagination={{
                            page: page.value,
                            pageSize: size.value,
                            pageSizes: [10, 15, 25, 50],
                            pageCount: total.value,
                            showSizePicker: true,
                            showQuickJumper: true
                        }}
                    ></n-data-table>
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
