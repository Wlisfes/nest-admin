<script lang="tsx">
import type { IUser } from '@/api/pipe'
import type { DataTableBaseColumn } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { httpColumnUser } from '@/api/service'
import { initMounte } from '@/utils/utils-tool'
import { useColumn } from '@/hooks/hook-column'

export default defineComponent({
    name: 'User',
    setup() {
        const { divineColumn, onlineColumn, chunkColumn, calcColumn } = useColumn()
        const page = ref<number>(1)
        const size = ref<number>(10)
        const total = ref<number>(0)
        const loading = ref<boolean>(true)
        const dataSource = ref<Array<IUser>>([])
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '账号', key: 'account', width: calcColumn(100, 1080) },
            { title: '头像', key: 'avatar', width: calcColumn(80, 1080) },
            { title: '昵称', key: 'nickname' },
            { title: '邮箱', key: 'email', width: calcColumn(140, 1080), ellipsis: { tooltip: true } },
            { title: '手机号', key: 'mobile', width: calcColumn(120, 1080), ellipsis: { tooltip: true } },
            { title: '角色', key: 'role', width: calcColumn(160, 1080) },
            { title: '注册时间', key: 'createTime', width: calcColumn(160, 1080) },
            { title: '状态', key: 'status', align: 'center', width: calcColumn(100, 1080) },
            { title: '操作', key: 'command', align: 'center', width: calcColumn(100, 1080) }
        ])

        /**用户列表**/
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

        const columnNative = (value: unknown, row: IUser, column: DataTableBaseColumn) => {
            if (column.key === 'avatar') {
                return <u-avatar src={value} username={row.nickname} size={40} round={4} align="start" />
            } else if (column.key === 'role') {
                return (
                    <n-space size={5}>
                        {row.role.map(x => (
                            <n-tag
                                key={x.id}
                                size="small"
                                type="success"
                                v-slots={{ default: () => x.name }}
                                style={{ cursor: 'pointer', height: '24px', userSelect: 'none' }}
                            />
                        ))}
                    </n-space>
                )
            } else if (column.key === 'status') {
                return onlineColumn(row.status)
            } else if (column.key === 'command') {
                return chunkColumn<IUser>({
                    row,
                    native: ['edit', 'reset'],
                    onSelecter: key => {
                        console.log(key)
                    }
                })
            }
            return divineColumn(value)
        }

        initMounte(() => {
            fecthColumnUser()
        })

        return () => {
            return (
                <AppContainer class="app-pipe" space="12px">
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
                        class="naive-customize"
                        size="small"
                        style={{ flex: 1 }}
                        scroll-x={1080}
                        bordered={false}
                        flex-height={true}
                        loading={loading.value}
                        row-key={(row: IUser) => row.id}
                        columns={dataColumn.value}
                        data={dataSource.value}
                        render-cell={columnNative}
                        pagination={{
                            page: page.value,
                            pageSize: size.value,
                            pageSizes: [10, 20, 30, 40, 50],
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
