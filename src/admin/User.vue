<script lang="tsx">
import type { IUser, IRole } from '@/api/pipe'
import { useNotification, type DataTableBaseColumn } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { AppContainer } from '@/components/global'
import { fetchResetUser, fetchUser } from '@/components/render'
import { httpColumnUser, httpColumnRole, httpCutoverUser } from '@/api/service'
import { useState } from '@/hooks/hook-state'
import { useColumn } from '@/hooks/hook-column'
import { initMounte } from '@/utils/utils-tool'

type IUserQuery = {
    status: number | null
    primary: string | null
    keyword: string | null
    roles: Array<IRole>
}

export default defineComponent({
    name: 'User',
    setup() {
        const notice = useNotification()
        const { online, divineColumn, onlineColumn, chunkColumn, calcColumn } = useColumn()
        const { state, setState } = useState<IUser, IUserQuery>({
            status: null,
            primary: null,
            keyword: null,
            roles: []
        })
        const dataColumn = ref<Array<DataTableBaseColumn>>([
            { title: '账号', key: 'account', width: calcColumn(100, 1080) },
            { title: '头像', key: 'avatar', width: calcColumn(80, 1080) },
            { title: '昵称', key: 'nickname' },
            { title: '邮箱', key: 'email', width: calcColumn(140, 1080), ellipsis: { tooltip: true } },
            { title: '手机号', key: 'mobile', width: calcColumn(120, 1080), ellipsis: { tooltip: true } },
            { title: '角色', key: 'role', width: calcColumn(160, 1080) },
            { title: '注册时间', key: 'createTime', width: calcColumn(160, 1080) },
            { title: '状态', key: 'status', align: 'center', width: calcColumn(100, 1080) },
            { title: '操作', key: 'command', align: 'center', width: calcColumn(100, 1080), fixed: 'right' }
        ])

        /**用户列表**/
        const fetchColumnUser = (handler?: Function) => {
            setState({ loading: true }).then(async () => {
                try {
                    const { page, size, status, primary, keyword } = state
                    const { data } = await httpColumnUser({ page, size, status, primary, keyword })
                    setState({
                        total: data.total,
                        dataSource: data.list,
                        loading: false
                    }).then(() => handler?.())
                } catch (e) {
                    setState({ loading: false })
                }
            })
        }

        /**角色列表**/
        const fetchColumnRole = async () => {
            try {
                const { data } = await httpColumnRole({ page: 1, size: 100 })
                setState({ roles: data.list })
            } catch (e) {}
        }

        /**修改用户状态**/
        const fetchCutoverPoster = ({ uid }: IUser) => {
            setState({ loading: true }).then(() => {
                try {
                    httpCutoverUser({ uid }).then(({ data }) => {
                        fetchColumnUser(() => {
                            notice.success({ content: data.message, duration: 2000 })
                        })
                    })
                } catch (e) {
                    setState({ loading: false })
                }
            })
        }

        const fetchCreate = () => {
            fetchUser({ key: 'create', roles: state.roles }, data => {
                fetchColumnUser(() => {
                    notice.success({ content: data.message, duration: 2000 })
                })
            })
        }

        const fetchReset = () => {
            setState({ page: 1, size: 10, status: null, primary: null, keyword: null }).then(() => {
                fetchColumnUser()
            })
        }

        const fetchUpdate = (parameter: { page?: number; size?: number }) => {
            setState(parameter).then(() => {
                fetchColumnUser()
            })
        }

        const onSelecter = (key: string, row: IUser) => {
            const handler = {
                edit: () => {
                    fetchUser({ key: 'edit', roles: state.roles, uid: row.uid }, data => {
                        fetchColumnUser(() => {
                            notice.success({ content: data.message, duration: 2000 })
                        })
                    })
                },
                reset: () => {
                    fetchResetUser(row, data => notice.success({ content: data.message, duration: 2000 }))
                },
                enable: () => fetchCutoverPoster(row),
                disable: () => fetchCutoverPoster(row)
            }

            handler[key as keyof typeof handler]?.()
        }

        const columnNative = (value: unknown, row: IUser, column: DataTableBaseColumn) => {
            const BaseNative = {
                avatar: () => (
                    <u-scale max-width={40} scale={1}>
                        <u-avatar src={row.avatar} username={row.nickname} size={40} round={4} align="start" />
                    </u-scale>
                ),
                role: () => (
                    <n-space size={5}>
                        {row.role.map(x => (
                            <n-tag key={x.id} size="small" type="success" style={online.value}>
                                {{ default: () => x.name }}
                            </n-tag>
                        ))}
                    </n-space>
                ),
                status: () => onlineColumn(row.status),
                command: () => chunkColumn<IUser>({ row, native: ['edit', 'reset'], onSelecter })
            }
            return BaseNative[column.key as keyof typeof BaseNative]?.() || divineColumn(value)
        }

        initMounte(() => {
            fetchColumnUser()
            fetchColumnRole()
        })

        return () => {
            return (
                <AppContainer class="app-pipe" space="12px">
                    <n-form class="is-customize" model={state} inline show-label={false} show-feedback={false}>
                        <div class="app-inline space-660">
                            <n-form-item>
                                <n-select
                                    v-model:value={state.primary}
                                    clearable
                                    options={state.roles.map(x => ({ id: x.id, label: x.name, value: x.primary }))}
                                    placeholder="用户角色"
                                    style={{ width: '150px' }}
                                />
                            </n-form-item>
                            <n-form-item>
                                <n-select
                                    v-model:value={state.status}
                                    clearable
                                    options={['已禁用', '已启用', '已删除'].map((x, v) => ({ label: x, value: v }))}
                                    placeholder="用户状态"
                                    style={{ width: '150px' }}
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
                            <n-button type="warning" secondary onClick={fetchReset}>
                                重 置
                            </n-button>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="success" secondary onClick={fetchCreate}>
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
                        flex-height={true}
                        loading={state.loading}
                        row-key={(row: IUser) => row.id}
                        columns={dataColumn.value}
                        data={state.dataSource}
                        render-cell={columnNative}
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
