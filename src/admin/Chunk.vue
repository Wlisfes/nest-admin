<script lang="tsx">
import type { IChunk } from '@/api/pipe'
import type { DataTableBaseColumn } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { httpColumnChunk } from '@/api/service'
import { useSource } from '@/hooks/hook-source'
import { useColumn } from '@/hooks/hook-column'
import { useClipboard } from '@/hooks/hook-super'
import { initMounte } from '@/utils/utils-tool'

export default defineComponent({
    name: 'Chunk',
    setup() {
        const { onRoter } = useClipboard()
        const { state, setState } = useSource<IChunk, { status: number | null }>({ status: null })
        const { online, divineColumn, calcColumn } = useColumn<IChunk>()
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '资源名称', key: 'name', ellipsis: { tooltip: true } },
            { title: '资源地址', key: 'url', width: calcColumn(240, 1080) },
            { title: '资源版本号', key: 'version', width: calcColumn(160, 1080) },
            { title: '状态', key: 'status', width: calcColumn(160, 1080) },
            { title: '创建时间', key: 'createTime', width: calcColumn(160, 1080) }
        ])

        /**资源列表**/
        const fetchColumnChunk = (handler?: Function) => {
            setState({ loading: true }).then(async () => {
                try {
                    const { data } = await httpColumnChunk({ page: state.page, size: state.size })
                    setState({
                        total: data.total,
                        dataSource: data.list || [],
                        loading: false
                    }).then(() => handler?.())
                } catch (e) {
                    setState({ loading: false })
                }
            })
        }

        const fetchReset = () => {
            setState({ page: 1, size: 10, status: null }).then(() => {
                fetchColumnChunk()
            })
        }

        const fetchUpdate = (parameter: { page?: number; size?: number }) => {
            setState(parameter).then(() => {
                fetchColumnChunk()
            })
        }

        const columnNative = (value: unknown, row: IChunk, column: DataTableBaseColumn) => {
            const BaseNative = {
                status: () => {
                    return row.status === 1 ? (
                        <n-tag size="small" type="success" style={online.value}>
                            {{ default: () => '当前版本' }}
                        </n-tag>
                    ) : (
                        <n-tag size="small" type="warning" style={online.value}>
                            {{ default: () => '历史版本' }}
                        </n-tag>
                    )
                },
                url: () => (
                    <n-tag
                        bordered={false}
                        type="info"
                        size="small"
                        class="naive-customize"
                        style={{ margin: '8px 0', ...online.value }}
                        onClick={() => onRoter(row.url)}
                    >
                        {{ default: () => '复制地址' }}
                    </n-tag>
                )
            }

            return BaseNative[column.key as keyof typeof BaseNative]?.() || divineColumn(value)
        }

        initMounte(() => {
            fetchColumnChunk()
        })

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
                            <n-button type="warning" secondary onClik={fetchReset}>
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
                        remote={true}
                        flex-height={true}
                        loading={state.loading}
                        row-key={(row: IChunk) => row.id}
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
