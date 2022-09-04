<script lang="tsx">
import { useDialog, useNotification, type DataTableBaseColumn, type ButtonProps as BU } from 'naive-ui'
import { defineComponent, ref, Fragment } from 'vue'
import { AppContainer } from '@/components/global'
import { httpColumnPoster, httpCutoverPoster, httpDeletePoster, httpColumnArticle } from '@/api'
import { useSource } from '@/hooks/hook-source'
import { useColumn } from '@/hooks/hook-column'
import { useClipboard } from '@/hooks/hook-super'

export default defineComponent({
    name: 'Article',
    setup() {
        const dialog = useDialog()
        const notice = useNotification()
        const { onCater } = useClipboard()
        const { divineColumn, divineSpine, onlineColumn, chunkColumn, calcColumn } = useColumn<IArticle>()
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '封面', key: 'cover', width: calcColumn(125, 1080) },
            { title: '标题', key: 'title', ellipsis: { tooltip: true } },
            { title: '标签', key: 'source', width: calcColumn(100, 1080) },
            { title: '浏览量', key: 'browse', width: calcColumn(100, 1080) },
            { title: '排序号', key: 'order', width: calcColumn(100, 1080) },
            { title: '创建时间', key: 'createTime', width: calcColumn(160, 1080) },
            { title: '状态', key: 'status', align: 'center', width: calcColumn(100, 1080) },
            { title: '操作', key: 'command', align: 'center', width: calcColumn(100, 1080), fixed: 'right' }
        ])
        const { state, setState, fetchUpdate } = useSource<IArticle, { title: string | null; source: number | null }>(
            {
                immediate: true,
                init: ({ page, size, status, title, source }) =>
                    httpColumnArticle({ page, size, status, title, source })
            },
            { title: null, source: null }
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

        const onSelecter = (key: string, row: IArticle) => {
            if (key === 'delete') {
                fetchDeletePoster(row.id)
            } else {
                fetchCutoverPoster(row.id)
            }
        }

        const columnNative = (value: unknown, row: IArticle, column: DataTableBaseColumn) => {
            const BaseNative = {
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
                source: () => (
                    <n-tooltip trigger="hover">
                        {{
                            trigger: () => {
                                return divineSpine(row.source[0].name, {
                                    bordered: false,
                                    color: { color: row.source[0].color }
                                })
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
                // url: () => (
                //     <n-tag
                //         bordered={false}
                //         type="info"
                //         size="small"
                //         class="naive-customize"
                //         style={online.value}
                //         onClick={() => onCater(row.url)}
                //     >
                //         {{ default: () => '复制图片地址' }}
                //     </n-tag>
                // ),
                // type: () => {
                //     const u = typeOptions.value.find(x => x.value === row.type)
                //     return (
                //         <n-tag bordered={false} type={u?.type} size="small" style={online.value}>
                //             {{ default: () => u?.label?.replace(/^\S/, s => s.toUpperCase()) }}
                //         </n-tag>
                //     )
                // },
                status: () => onlineColumn(row.status),
                command: () => chunkColumn<IArticle>({ row, native: ['delete'], onSelecter })
            }

            return BaseNative[column.key as keyof typeof BaseNative]?.() || divineColumn(value)
        }

        return () => {
            return (
                <AppContainer class="app-pipe" space="12px">
                    <n-form class="is-customize" model={state} inline show-label={false} show-feedback={false}>
                        <div class="app-inline space-660">
                            <n-form-item>
                                {/**<n-select
                                    v-model:value={state.source}
                                    clearable
                                    options={typeOptions.value}
                                    placeholder="图片类型"
                                    style={{ width: '150px' }}
                                />**/}
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
                                onClick={() => {
                                    fetchUpdate({ page: 1, size: 10, status: null, title: null, source: null })
                                }}
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
