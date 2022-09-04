<script lang="tsx">
import { useDialog, useNotification, type DataTableBaseColumn, type ButtonProps as BU } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { httpColumnPoster, httpCutoverPoster, httpDeletePoster } from '@/api'
import { useSource } from '@/hooks/hook-source'
import { useColumn } from '@/hooks/hook-column'
import { useClipboard } from '@/hooks/hook-super'

export default defineComponent({
    name: 'Record',
    setup() {
        const dialog = useDialog()
        const notice = useNotification()
        const { onCater } = useClipboard()
        const { online, divineColumn, onlineColumn, chunkColumn, calcColumn } = useColumn<IPoster>()
        const typeOptions = ref([
            { label: 'avatar', value: 1, type: 'error' },
            { label: 'upload', value: 2, type: 'success' },
            { label: 'cover', value: 3, type: 'info' },
            { label: 'photo', value: 4, type: 'warning' }
        ])
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '图片预览', key: 'check', width: calcColumn(140, 1080) },
            { title: '图片类型', key: 'type', width: calcColumn(120, 1080) },
            { title: '图片地址', key: 'url', width: calcColumn(160, 1080), ellipsis: { tooltip: true } },
            { title: '图片备注', key: 'mobile', ellipsis: { tooltip: true } },
            { title: '上传时间', key: 'createTime', width: calcColumn(160, 1080) },
            { title: '状态', key: 'status', align: 'center', width: calcColumn(100, 1080) },
            { title: '操作', key: 'command', align: 'center', width: calcColumn(100, 1080), fixed: 'right' }
        ])
        const { state, setState, fetchUpdate } = useSource<IPoster, { type: number | null }>(
            {
                immediate: true,
                init: ({ page, size, status, type }) => httpColumnPoster({ page, size, status, type })
            },
            { type: null }
        )

        /**修改图床状态**/
        const fetchCutoverPoster = (id: number) => {
            setState({ loading: true }).then(() => {
                try {
                    httpCutoverPoster({ id }).then(({ data }) => {
                        fetchUpdate({}, () => {
                            notice.success({ content: data.message, duration: 2000 })
                        })
                    })
                } catch (e) {
                    setState({ loading: false })
                }
            })
        }

        /**删除图床**/
        const fetchDeletePoster = (id: number) => {
            const e = dialog.warning({
                title: '确定要删除吗？',
                positiveText: '确定',
                negativeText: '取消',
                negativeButtonProps: { type: 'success', size: 'medium', ghost: false, class: 'naive-customize' } as BU,
                positiveButtonProps: { type: 'error', size: 'medium', class: 'naive-customize' } as BU,
                style: {
                    minHeight: '160px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    margin: '100px auto auto'
                },
                closable: false,
                onPositiveClick: () => {
                    return new Promise(resolve => {
                        try {
                            e.loading = true
                            httpDeletePoster({ id }).then(({ data }) => {
                                setState({ loading: true }).then(() => {
                                    resolve(true)
                                    fetchUpdate({}, () => {
                                        notice.success({ content: data.message, duration: 2000 })
                                    })
                                })
                            })
                        } catch (e) {
                            resolve(true)
                        }
                    })
                }
            })
        }

        const onSelecter = (key: string, row: IPoster) => {
            if (key === 'delete') {
                fetchDeletePoster(row.id)
            } else {
                fetchCutoverPoster(row.id)
            }
        }

        const columnNative = (value: unknown, row: IPoster, column: DataTableBaseColumn) => {
            const BaseNative = {
                check: () => (
                    <u-scale max-width={row.type === 3 ? 96 : 54} scale={row.type === 3 ? 16 / 9 : 1}>
                        <n-image
                            object-fit="cover"
                            preview-src={row.url}
                            show-toolbar-tooltip
                            src={`${row.url}?x-oss-process=style/resize`}
                            v-slots={{ placeholder: () => <n-skeleton width="100%" height="100%" /> }}
                        />
                    </u-scale>
                ),
                url: () => (
                    <n-tag
                        bordered={false}
                        type="info"
                        size="small"
                        class="naive-customize"
                        style={online.value}
                        onClick={() => onCater(row.url)}
                    >
                        {{ default: () => '复制图片地址' }}
                    </n-tag>
                ),
                type: () => {
                    const u = typeOptions.value.find(x => x.value === row.type)
                    return (
                        <n-tag bordered={false} type={u?.type} size="small" style={online.value}>
                            {{ default: () => u?.label?.replace(/^\S/, s => s.toUpperCase()) }}
                        </n-tag>
                    )
                },
                status: () => onlineColumn(row.status),
                command: () => chunkColumn<IPoster>({ row, native: ['delete'], onSelecter })
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
                                    v-model:value={state.type}
                                    clearable
                                    options={typeOptions.value}
                                    placeholder="图片类型"
                                    style={{ width: '150px' }}
                                />
                            </n-form-item>
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
                                onClick={() => fetchUpdate({ page: 1, size: 10, status: null, type: null })}
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
                        row-key={(row: IPoster) => row.id}
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
