<script lang="tsx">
import type { IModule } from '@/interface/api/http-system'
import { useNotification, type DataTableBaseColumn } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { useColumn } from '@/hooks/hook-column'
import { useSource } from '@/hooks/hook-source'
import { httpRowGuard, Parameter } from '@/api/service-system'

export default defineComponent({
    name: 'Guard',
    setup() {
        const column = useColumn<IModule>()
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '守卫名称', key: 'name', ellipsis: { tooltip: true } },
            { title: '守卫标识', key: 'primary', width: column.calcColumn(240, 1080) },
            { title: '守卫备注', key: 'comment', width: column.calcColumn(240, 1080) },
            { title: '创建时间', key: 'createTime', width: column.calcColumn(160, 1080) },
            { title: '守卫状态', key: 'status', width: column.calcColumn(160, 1080) },
            { title: '操作', key: 'command', align: 'center', width: column.calcColumn(100, 1080), fixed: 'right' }
        ])
        const { state, fetchUpdate } = useSource<IModule, Parameter>({
            immediate: true,
            init: ({ page, size, name, status }) => httpRowGuard({ page, size, name, status })
        })

        const render = (value: unknown, row: IModule, base: DataTableBaseColumn) => {
            const __COLOR__ = {
                status: () => column.onlineColumn(row.status, null, { margin: '8px 0' }),
                command: () => column.chunkColumn<IModule>({ row, native: ['edit'] })
            }

            return __COLOR__[base.key as keyof typeof __COLOR__]?.() || column.divineColumn(value)
        }

        return () => {
            return (
                <AppContainer class="app-pipe" space="12px">
                    <n-form class="is-customize" model={state} inline show-label={false} show-feedback={false}>
                        <div class="app-inline space-660">
                            <n-form-item>
                                <n-select
                                    v-model:value={state.status}
                                    clearable
                                    options={['已禁用', '已启用'].map((x, v) => ({ label: x, value: v }))}
                                    placeholder="守卫状态"
                                    style={{ width: '150px' }}
                                    onUpdateValue={fetchUpdate}
                                />
                            </n-form-item>
                        </div>
                        <div class="app-inline space-660">
                            <n-form-item>
                                <n-input
                                    v-model:value={state.name}
                                    clearable
                                    placeholder="守卫名称"
                                    style={{ width: '260px' }}
                                />
                            </n-form-item>
                        </div>
                        <n-form-item>
                            <n-button type="info" secondary onClick={() => fetchUpdate({ page: 1, size: 10 })}>
                                查 找
                            </n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button
                                type="warning"
                                secondary
                                onClick={() => fetchUpdate({ page: 1, size: 10, status: null, name: '' })}
                            >
                                重 置
                            </n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="success" secondary>
                                新 增
                            </n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button tertiary onClick={fetchUpdate}>
                                刷 新
                            </n-button>
                        </n-form-item>
                    </n-form>
                    <n-data-table
                        class="naive-customize"
                        size="small"
                        style={{ flex: 1 }}
                        scroll-x={1080}
                        bordered={false}
                        remote={true}
                        flex-height={true}
                        loading={state.loading}
                        row-key={(row: IModule) => row.id}
                        columns={dataColumn.value}
                        data={state.dataSource}
                        render-cell={render}
                        pagination={{
                            page: state.page,
                            pageSize: state.size,
                            itemCount: state.total,
                            pageSizes: [10, 20, 30, 40, 50],
                            showSizePicker: true,
                            showQuickJumper: true,
                            onUpdatePage: (value: number) => fetchUpdate({ page: value }),
                            onUpdatePageSize: (value: number) => fetchUpdate({ page: 1, size: value })
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
