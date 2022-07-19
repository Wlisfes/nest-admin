<script lang="tsx">
import type { ILogger } from '@/api/pipe'
import { useNotification, type DataTableBaseColumn } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { httpColumnLogger } from '@/api/service'
import { useSource } from '@/hooks/hook-source'
import { useColumn } from '@/hooks/hook-column'
import { useClipboard } from '@/hooks/hook-super'
import { fetchChunk } from '@/components/core'
import { initMounte } from '@/utils/utils-tool'

export default defineComponent({
    name: 'Logger',
    setup() {
        const notice = useNotification()
        const { onCater } = useClipboard()
        const { state, setState } = useSource<ILogger, { status: number | null }>({ status: null })
        const { online, divineColumn, onlineColumn, chunkColumn, calcColumn } = useColumn<ILogger>()
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '序号', key: 'id', width: calcColumn(80, 1080) },
            { title: '来源ip', key: 'ip', width: calcColumn(130, 1080) },
            { title: '请求地址', key: 'path', ellipsis: true, width: calcColumn(200, 1080) },
            { title: '请求类型', key: 'method', width: calcColumn(80, 1080) },
            { title: '请求状态', key: 'type', align: 'center', width: calcColumn(100, 1080) },
            { title: '状态码', key: 'code', width: calcColumn(80, 1080) },
            { title: '状态描述', key: 'message', width: calcColumn(160, 1080) },
            { title: '创建时间', key: 'createTime', width: calcColumn(160, 1080) },
            { title: '操作', key: 'command', align: 'center', width: calcColumn(100, 1080) }
        ])

        /**Logger列表**/
        const fetchColumnLogger = (handler?: Function) => {
            setState({ loading: true }).then(async () => {
                try {
                    const { data } = await httpColumnLogger({ page: state.page, size: state.size })
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
                fetchColumnLogger()
            })
        }

        const fetchUpdate = (parameter: { page?: number; size?: number }) => {
            setState(parameter).then(() => {
                fetchColumnLogger()
            })
        }

        const columnNative = (value: unknown, row: IChunk, column: DataTableBaseColumn) => {
            const BaseNative = {
                type: () => (
                    <div style={{ margin: '8px 0' }}>
                        {row.type === 1 ? onlineColumn(1, 'success') : onlineColumn(0, 'error')}
                    </div>
                ),
                command: () => chunkColumn<IUser>({ row, native: ['edit', 'reset'] })
            }

            return BaseNative[column.key as keyof typeof BaseNative]?.() || divineColumn(value)
        }

        initMounte(() => {
            fetchColumnLogger()
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
