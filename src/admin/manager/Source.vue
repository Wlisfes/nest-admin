<script lang="tsx">
import { type DataTableBaseColumn } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { useColumn } from '@/hooks/hook-column'
import { useSource } from '@/hooks/hook-source'
import { nodeColumnCloudSource } from '@/api'

export default defineComponent({
    name: 'Source',
    setup() {
        const { online, divineColumn, onlineColumn, chunkColumn, calcColumn } = useColumn<ICloudSource>()
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '封面', key: 'name', width: calcColumn(200, 1080) },
            { title: '备注', key: 'comment', ellipsis: { tooltip: { contentStyle: { maxWidth: '450px' } } } },
            { title: '排序', key: 'order', width: calcColumn(100, 1080) },
            { title: '创建时间', key: 'createTime', width: calcColumn(160, 1080) },
            { title: '状态', key: 'status', align: 'center', width: calcColumn(100, 1080) },
            { title: '操作', key: 'command', align: 'center', width: calcColumn(120, 1080), fixed: 'right' }
        ])
        const { state, fetchUpdate } = useSource<ICloudSource, { name?: string }>(
            {
                immediate: true,
                init: ({ page, size, status, name }) => nodeColumnCloudSource({ page, size, status, name })
            },
            { name: undefined }
        )

        const render = (value: unknown, row: ICloudSource, column: DataTableBaseColumn) => {
            const BaseNative = {
                name: () => (
                    <n-tag
                        size="small"
                        bordered={false}
                        color={{ color: row.color, textColor: '#ffffff' }}
                        style={online.value}
                        v-slots={{ default: () => row.name }}
                    ></n-tag>
                ),
                status: () => onlineColumn(row.status, null, { margin: '8px 0' }),
                command: () => chunkColumn<ICloudSource>({ row, native: ['edit', 'delete'] })
            }

            return BaseNative[column.key as keyof typeof BaseNative]?.() || divineColumn(value)
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
                                    options={['已禁用', '已启用', '已删除'].map((x, v) => ({ label: x, value: v }))}
                                    placeholder="请选择状态"
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
                                    placeholder="请输入标题"
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
                                onClick={() => fetchUpdate({ page: 1, size: 10, status: undefined, name: undefined })}
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
                        row-key={(row: IAction) => row.id}
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
