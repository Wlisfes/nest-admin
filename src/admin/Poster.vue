<script lang="tsx">
import type { IPoster } from '@/api/pipe'
import type { DataTableBaseColumn } from 'naive-ui'
import { defineComponent, ref, nextTick } from 'vue'
import { AppContainer } from '@/components/global'
import { httpColumnPoster } from '@/api/service'
import { useSource } from '@/hooks/hook-source'
import { useColumn } from '@/hooks/hook-column'
import { initMounte } from '@/utils/utils-tool'

export default defineComponent({
    name: 'Poster',
    setup() {
        const { page, size, total, loading, dataSource, setState } = useSource()
        const { online, divineColumn, onlineColumn, chunkColumn, calcColumn } = useColumn<IPoster>()
        const form = ref({ status: undefined, type: undefined })
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '图片预览', key: 'check', width: calcColumn(140, 1080) },
            { title: '图片类型', key: 'type', width: calcColumn(120, 1080) },
            { title: '图片地址', key: 'url', width: calcColumn(160, 1080), ellipsis: { tooltip: true } },
            { title: '图片备注', key: 'mobile', ellipsis: { tooltip: true } },
            { title: '上传时间', key: 'createTime', width: calcColumn(160, 1080) },
            { title: '状态', key: 'status', align: 'center', width: calcColumn(100, 1080) },
            { title: '操作', key: 'command', align: 'center', width: calcColumn(100, 1080) }
        ])
        const typeSource = ref([
            { label: 'avatar', value: 1, type: 'error' },
            { label: 'upload', value: 2, type: 'success' },
            { label: 'cover', value: 3, type: 'info' },
            { label: 'photo', value: 4, type: 'warning' }
        ])

        /**图床列表**/
        const fetchColumnPoster = async () => {
            try {
                setState({ loading: true })
                const { status, type } = form.value
                const { data } = await httpColumnPoster({
                    page: page.value,
                    size: size.value,
                    status,
                    type
                })
                setState({
                    total: data.total,
                    dataSource: data.list || [],
                    loading: false
                })
            } catch (e) {
                setState({ loading: false })
            }
        }

        const fetchReset = () => {
            setState({ page: 1, size: 10 }).then(() => {
                form.value.status = undefined
                form.value.type = undefined
                nextTick(() => fetchColumnPoster())
            })
        }

        const columnNative = (value: unknown, row: IPoster, column: DataTableBaseColumn) => {
            const BaseNative = {
                check: () => (
                    <n-image
                        width={96}
                        height={54}
                        object-fit="cover"
                        preview-src={row.url}
                        show-toolbar-tooltip
                        src={`${row.url}?x-oss-process=style/resize`}
                        v-slots={{ placeholder: () => <n-skeleton width="96px" height="54px" /> }}
                    />
                ),
                url: () => (
                    <n-button secondary size="small" class="naive-customize">
                        复制图片地址
                    </n-button>
                ),
                type: () => {
                    const u = typeSource.value.find(x => x.value === row.type)
                    return (
                        <n-tag bordered={false} type={u?.type} size="small" style={online.value}>
                            {{ default: () => u?.label?.replace(/^\S/, s => s.toUpperCase()) }}
                        </n-tag>
                    )
                },
                status: () => onlineColumn(row.status),
                command: () => {
                    return chunkColumn<IPoster>({
                        row,
                        native: ['delete'],
                        onSelecter: key => {
                            console.log(key)
                        }
                    })
                }
            }

            return BaseNative[column.key as keyof typeof BaseNative]?.() || divineColumn(value)
        }

        initMounte(() => {
            fetchColumnPoster()
        })

        return () => {
            return (
                <AppContainer class="app-pipe" space="12px">
                    <n-form class="is-customize" model={form.value} inline show-label={false} show-feedback={false}>
                        <div class="app-inline space-660">
                            <n-form-item>
                                <n-select
                                    v-model:value={form.value.type}
                                    clearable
                                    options={typeSource.value}
                                    placeholder="图片类型"
                                    style={{ width: '150px' }}
                                />
                            </n-form-item>
                            <n-form-item>
                                <n-select
                                    v-model:value={form.value.status}
                                    clearable
                                    options={['已禁用', '已启用', '已删除'].map((x, v) => ({ label: x, value: v }))}
                                    placeholder="图片状态"
                                    style={{ width: '150px' }}
                                />
                            </n-form-item>
                        </div>
                        <n-form-item>
                            <n-button type="info" secondary onClick={fetchColumnPoster}>
                                查 找
                            </n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="warning" secondary onClick={fetchReset}>
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
                        loading={loading.value}
                        row-key={(row: IPoster) => row.id}
                        columns={dataColumn.value}
                        data={dataSource.value}
                        render-cell={columnNative}
                        pagination={{
                            page: page.value,
                            pageSize: size.value,
                            itemCount: total.value,
                            pageSizes: [10, 20, 30, 40, 50],
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
