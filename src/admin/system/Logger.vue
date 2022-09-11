<script lang="tsx">
import type { ILogger } from '@/interface/api/http-system'
import { useNotification, type DataTableBaseColumn } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { httpRowLogger, Parameter } from '@/api/service-system'
import { useSource } from '@/hooks/hook-source'
import { useColumn } from '@/hooks/hook-column'

export default defineComponent({
    name: 'Logger',
    setup() {
        const column = useColumn<ILogger>()
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '序号', key: 'id', width: column.calcColumn(80, 1080) },
            { title: '来源ip', key: 'ip', width: column.calcColumn(130, 1080) },
            { title: '请求地址', key: 'path', ellipsis: true, width: column.calcColumn(200, 1080) },
            { title: '请求类型', key: 'method', width: column.calcColumn(80, 1080) },
            { title: '请求状态', key: 'type', align: 'center', width: column.calcColumn(100, 1080) },
            { title: '状态码', key: 'code', width: column.calcColumn(80, 1080) },
            { title: '状态描述', key: 'message', width: column.calcColumn(160, 1080) },
            { title: '创建时间', key: 'createTime', width: column.calcColumn(160, 1080) },
            { title: '操作', key: 'command', align: 'center', width: column.calcColumn(100, 1080), fixed: 'right' }
        ])
        const { state, fetchUpdate } = useSource<ILogger, Parameter>({
            immediate: true,
            init: ({ page, size, status, type }) => httpRowLogger({ page, size, status, type })
        })

        const render = (value: unknown, row: ILogger, base: DataTableBaseColumn) => {
            const __COLUME__ = {
                type: () => column.onlineColumn(row.type, row.type === 1 ? 'success' : 'error', { margin: '8px 0' }),
                command: () => column.chunkColumn({ row, native: ['edit'] })
            }
            return __COLUME__[base.key as keyof typeof __COLUME__]?.() || column.divineColumn(value)
        }

        return () => {
            return (
                <AppContainer class="app-pipe" space="12px">
                    <n-form class="is-customize" model={state} inline show-label={false} show-feedback={false}>
                        <div class="app-inline space-580">
                            <n-form-item>
                                <n-select
                                    v-model:value={state.status}
                                    clearable
                                    options={['已禁用', '已启用', '已删除'].map((x, v) => ({ label: x, value: v }))}
                                    placeholder="图片状态"
                                    style={{ width: '150px' }}
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
                                onClik={() => fetchUpdate({ page: 1, size: 10, status: null })}
                            >
                                重 置
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
                        row-key={(row: ILogger) => row.id}
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
