<script lang="tsx">
import { useNotification, type DataTableBaseColumn } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { httpColumnMinute } from '@/api'
import { useSource } from '@/hooks/hook-source'
import { useColumn } from '@/hooks/hook-column'

export default defineComponent({
    name: 'Record',
    setup() {
        const notice = useNotification()
        const { divineColumn, divineSpine, onlineColumn, chunkColumn, calcColumn } = useColumn<IRecord>()
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '封面', key: 'cover', width: calcColumn(125, 1080) },
            { title: '名称', key: 'name', ellipsis: { tooltip: { contentStyle: { maxWidth: '450px' } } } },
            { title: '描述', key: 'description', ellipsis: { tooltip: { contentStyle: { maxWidth: '450px' } } } },
            { title: '标签', key: 'source', width: calcColumn(100, 1080) },
            { title: '排序号', key: 'order', width: calcColumn(100, 1080) },
            { title: '创建时间', key: 'createTime', width: calcColumn(160, 1080) },
            { title: '状态', key: 'status', width: calcColumn(100, 1080) },
            { title: '操作', key: 'command', align: 'center', width: calcColumn(100, 1080), fixed: 'right' }
        ])
        const { state, fetchUpdate } = useSource<IRecord, { name: string | null; source: number | null }>({
            immediate: true,
            props: { name: null, source: null },
            init: ({ page, size, status, name, source }) => httpColumnMinute({ page, size, status, name, source })
        })

        const fetchCreate = () => {}

        const render = (value: unknown, row: IRecord, column: DataTableBaseColumn) => {
            const __BASE_COLUME__ = {
                cover: () => (
                    <u-scale max-width={96} scale={16 / 9}>
                        <n-image
                            object-fit="cover"
                            preview-src={row.cover}
                            show-toolbar-tooltip
                            src={`${row.cover}?x-oss-process=style/resize`}
                            v-slots={{ placeholder: () => <n-skeleton width="100%" height="100%" /> }}
                        />
                    </u-scale>
                ),
                source: () => {
                    return (
                        <n-tooltip trigger="hover">
                            {{
                                trigger: () => {
                                    const { name, color } = row.source[0]
                                    return divineSpine(name, { bordered: false, color: { color } })
                                },
                                default: () => (
                                    <n-space size={10}>
                                        {row.source.map(({ name, color }) => {
                                            return divineSpine(name, { bordered: false, color: { color } })
                                        })}
                                    </n-space>
                                )
                            }}
                        </n-tooltip>
                    )
                },
                status: () => onlineColumn(row.status),
                command: () => chunkColumn<IRecord>({ row, native: ['delete'] })
            }

            return __BASE_COLUME__[column.key as keyof typeof __BASE_COLUME__]?.() || divineColumn(value)
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
                                    placeholder="请选择状态"
                                    style={{ width: '150px' }}
                                    onUpdateValue={fetchUpdate}
                                />
                            </n-form-item>
                        </div>
                        <div class="app-inline space-580">
                            <n-form-item>
                                <n-input
                                    v-model:value={state.name}
                                    clearable
                                    placeholder="请输入名称、描述"
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
                                onClik={() => fetchUpdate({ page: 1, size: 10, status: null })}
                            >
                                重 置
                            </n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="success" secondary onClick={fetchCreate}>
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
                        row-key={(row: IRecord) => row.id}
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
