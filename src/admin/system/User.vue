<script lang="tsx">
import type { IRole, IUser } from '@/interface/api/http-system'
import { useNotification, type DataTableBaseColumn } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { fetchResetUser, fetchUser } from '@/components/core'
import { httpRowUser, httpRowRole, httpPutUser, Parameter } from '@/api/service-system'
import { useSource } from '@/hooks/hook-source'
import { useColumn } from '@/hooks/hook-column'
import { useRequest } from '@/hooks/hook-request'

export default defineComponent({
    name: 'User',
    setup() {
        const notice = useNotification()
        const column = useColumn()
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '账号', key: 'account', width: column.calcColumn(100, 1080) },
            { title: '头像', key: 'avatar', width: column.calcColumn(80, 1080) },
            { title: '昵称', key: 'nickname' },
            { title: '邮箱', key: 'email', width: column.calcColumn(140, 1080), ellipsis: { tooltip: true } },
            { title: '手机号', key: 'mobile', width: column.calcColumn(120, 1080), ellipsis: { tooltip: true } },
            { title: '角色', key: 'role', width: column.calcColumn(160, 1080) },
            { title: '注册时间', key: 'createTime', width: column.calcColumn(160, 1080) },
            { title: '状态', key: 'status', align: 'center', width: column.calcColumn(100, 1080) },
            { title: '操作', key: 'command', align: 'center', width: column.calcColumn(100, 1080), fixed: 'right' }
        ])
        const { state, setState, fetchUpdate } = useSource<IUser, Parameter>({
            immediate: true,
            props: { primary: null, keyword: null },
            init: ({ page, size, status, primary, keyword }) => {
                return httpRowUser({ page, size, status, primary, keyword })
            }
        })
        const { node } = useRequest<IRole>({
            immediate: true,
            init: () => httpRowRole({ page: 1, size: 100 })
        })

        /**修改用户状态**/
        const fetchPutPoster = ({ uid }: IUser) => {
            setState({ loading: true }).then(() => {
                try {
                    httpPutUser({ uid }).then(({ data }) => {
                        fetchUpdate({}, () => {
                            notice.success({ content: data.message, duration: 2000 })
                        })
                    })
                } catch (e) {
                    setState({ loading: false })
                }
            })
        }

        const fetchCreate = () => {
            fetchUser({ key: 'create', roles: node.value.list }).then(({ observer }) => {
                const done = observer.on('submit', data => {
                    fetchUpdate({}, () => {
                        notice.success({ content: (data as IUser).message, duration: 2000, onAfterEnter: done })
                    })
                })
            })
        }

        const onSelecter = (key: string, row: IUser) => {
            const handler = {
                edit: () => {
                    fetchUser({ key: 'edit', roles: node.value.list, uid: row.uid }).then(({ observer }) => {
                        const done = observer.on('submit', data => {
                            fetchUpdate({}, () => {
                                notice.success({ content: (data as IUser).message, duration: 2000, onAfterEnter: done })
                            })
                        })
                    })
                },
                reset: () => {
                    fetchResetUser(row).then(({ observer }) => {
                        const done = observer.on('submit', data => {
                            notice.success({ content: (data as IUser).message, duration: 2000, onAfterEnter: done })
                        })
                    })
                },
                enable: () => fetchPutPoster(row),
                disable: () => fetchPutPoster(row)
            }

            handler[key as keyof typeof handler]?.()
        }

        const render = (value: unknown, row: IUser, base: DataTableBaseColumn) => {
            const __COLUME__ = {
                avatar: () => (
                    <u-scale max-width={40} scale={1}>
                        <u-avatar src={row.avatar} username={row.nickname} size={40} round={4} align="start" />
                    </u-scale>
                ),
                role: () => (
                    <n-space size={5}>
                        {row.role.map(x =>
                            column.divineSpine(x.name, { type: 'success', color: { textColor: undefined } })
                        )}
                    </n-space>
                ),
                status: () => column.onlineColumn(row.status),
                command: () => column.chunkColumn<IUser>({ row, native: ['edit', 'reset'], onSelecter })
            }
            return __COLUME__[base.key as keyof typeof __COLUME__]?.() || column.divineColumn(value)
        }

        return () => {
            return (
                <AppContainer class="app-pipe" space="12px">
                    <n-form class="is-customize" model={state} inline show-label={false} show-feedback={false}>
                        <div class="app-inline space-660">
                            <n-form-item>
                                <n-select
                                    v-model:value={state.primary}
                                    clearable
                                    options={node.value?.list.map(x => ({ id: x.id, label: x.name, value: x.primary }))}
                                    placeholder="用户角色"
                                    style={{ width: '150px' }}
                                    onUpdateValue={fetchUpdate}
                                />
                            </n-form-item>
                            <n-form-item>
                                <n-select
                                    v-model:value={state.status}
                                    clearable
                                    options={['已禁用', '已启用', '已删除'].map((x, v) => ({ label: x, value: v }))}
                                    placeholder="用户状态"
                                    style={{ width: '150px' }}
                                    onUpdateValue={fetchUpdate}
                                />
                            </n-form-item>
                        </div>
                        <div class="app-inline space-580">
                            <n-form-item>
                                <n-input
                                    v-model:value={state.keyword}
                                    clearable
                                    placeholder="关键字"
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
                                onClick={() => {
                                    fetchUpdate({ page: 1, size: 10, status: null, primary: null, keyword: null })
                                }}
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
                        flex-height={true}
                        loading={state.loading}
                        row-key={(row: IUser) => row.id}
                        columns={dataColumn.value}
                        data={state.dataSource}
                        render-cell={render}
                        pagination={{
                            page: state.page,
                            pageSize: state.size,
                            pageSizes: [10, 20, 30, 40, 50],
                            pageCount: state.total,
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
