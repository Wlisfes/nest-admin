<script lang="tsx">
import type { DataTableBaseColumn } from 'naive-ui'
import type { ISource, IArticle } from '@/interface/api/http-manager'
import { defineComponent, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { httpRowSource, httpRowArticle, Parameter } from '@/api/service-manager'
import { useSource } from '@/hooks/hook-source'
import { useRequest } from '@/hooks/hook-request'
import { useColumn } from '@/hooks/hook-column'

export default defineComponent({
    name: 'Article',
    setup() {
        const { divineColumn, divineSpine, divineImage, onlineColumn, chunkColumn, calcColumn } = useColumn<IArticle>()
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '封面', key: 'cover', width: calcColumn(125, 1080) },
            { title: '标题', key: 'title', ellipsis: { tooltip: { contentStyle: { maxWidth: '450px' } } } },
            { title: '标签', key: 'source', width: calcColumn(100, 1080) },
            { title: '浏览量', key: 'browse', width: calcColumn(100, 1080) },
            { title: '排序号', key: 'order', width: calcColumn(100, 1080) },
            { title: '创建时间', key: 'createTime', width: calcColumn(160, 1080) },
            { title: '状态', key: 'status', align: 'center', width: calcColumn(100, 1080) },
            { title: '操作', key: 'command', align: 'center', width: calcColumn(120, 1080), fixed: 'right' }
        ])
        const { state, fetchUpdate } = useSource<IArticle, Parameter>({
            immediate: true,
            props: { title: null, source: null },
            init: ({ page, size, status, title, source }) => httpRowArticle({ page, size, status, title, source })
        })
        const { node: source } = useRequest<ISource>({
            immediate: true,
            init: () => httpRowSource({ page: 1, size: 100 })
        })

        const columnNative = (value: unknown, row: IArticle, column: DataTableBaseColumn) => {
            const BaseNative = {
                cover: () => divineImage({ src: row.cover, width: 96, scale: 16 / 9 }),
                source: () => (
                    <n-tooltip trigger="hover">
                        {{
                            trigger: () => {
                                const { name, color } = row.source[0]
                                return divineSpine(name, { bordered: false, color: { color } })
                            },
                            default: () => (
                                <n-space size={10}>
                                    {row.source.map(x => {
                                        return divineSpine(x.name, { bordered: false, color: { color: x.color } })
                                    })}
                                </n-space>
                            )
                        }}
                    </n-tooltip>
                ),
                status: () => onlineColumn(row.status),
                command: () => chunkColumn<IArticle>({ row, native: ['delete'] })
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
                                    v-model:value={state.source}
                                    options={source.value?.list.map(x => ({ label: x.name, value: x.id }))}
                                    clearable
                                    filterable
                                    placeholder="请选择状态"
                                    style={{ width: '150px' }}
                                    onUpdateValue={fetchUpdate}
                                />
                            </n-form-item>
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
                                    v-model:value={state.title}
                                    clearable
                                    placeholder="请输入名称、描述"
                                    style={{ width: '250px' }}
                                />
                            </n-form-item>
                        </div>
                        <n-form-item>
                            <n-button type="info" secondary onClick={() => fetchUpdate({ page: 1, size: 10 })}>
                                查 找
                            </n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="success" secondary>
                                新 增
                            </n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button
                                type="warning"
                                secondary
                                onClick={() => {
                                    fetchUpdate({ page: 1, size: 10, status: null, title: null, source: null })
                                }}
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
                        row-key={(row: IArticle) => row.id}
                        columns={dataColumn.value}
                        data={state.dataSource}
                        render-cell={columnNative}
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
