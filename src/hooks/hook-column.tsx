import type { DropdownOption } from 'naive-ui'
import { NTag, NText, NButtonGroup, NButton, NPopover, NDivider, NDropdown } from 'naive-ui'
import { h, ref, computed, CSSProperties } from 'vue'
import { Icons, useRxicon } from '@/hooks/hook-icon'
import { useProvider } from '@/hooks/hook-provider'

type IChunkCter = 'edit' | 'reset' | 'disable' | 'enable' | 'delete'
type IOption = { label: string; key: IChunkCter; icon: keyof typeof Icons; color: string }
type IChunk<T> = {
    row: IProvider & T
    native: Array<IChunkCter>
    onSelecter: (key: IChunkCter, row: T) => void
}
type IColumn<T> = {
    page?: number
    size?: number
    total?: number
    loading?: boolean
    dataSource?: Array<T>
}

export function useColumn<R = any>(props?: IColumn<R>) {
    const { vars } = useProvider()
    const { Icon, compute } = useRxicon()
    const options = ref<Array<IOption | DropdownOption>>([
        { label: '编辑', key: 'edit', icon: 'EditOutlined', color: '#1890ff' },
        { label: '删除', key: 'delete', icon: 'DeleteOutlined', color: '#ff4d4f' },
        { label: '重置密码', key: 'reset', icon: 'ReloadOutlined', color: '#f5222d' }
    ])
    const online = computed<CSSProperties>(() => ({ cursor: 'pointer', height: '24px', userSelect: 'none' }))

    /**计算列百分比**/
    const calcColumn = (width: number, max: number = 1080) => {
        return (width / max) * 100 + '%'
    }

    /**操作列**/
    const chunkColumn = <T,>({ row, native, onSelecter }: IChunk<T>) => {
        const nativeOption = computed(() => {
            return native.map(key => options.value.find(x => key === x.key))
        })
        return (
            <NButtonGroup>
                <NDropdown
                    options={nativeOption.value as Array<DropdownOption>}
                    show-arrow
                    trigger="click"
                    placement="top-end"
                    render-icon={(u: IOption) => h(Icon, { color: u.color, component: compute(u.icon) })}
                    render-label={(u: IOption) => {
                        return h(NText, { style: { color: u.color } }, { default: () => u.label })
                    }}
                    onSelect={key => onSelecter(key, row)}
                >
                    {{ default: () => h(NButton, { type: 'info', text: true }, { default: () => '操作' }) }}
                </NDropdown>
                <NDivider vertical />
                {row.status === 0 ? (
                    <NButton text text-color={vars.value.enableTextColor} onClick={e => onSelecter('enable', row)}>
                        {{ default: () => '启用' }}
                    </NButton>
                ) : row.status === 1 ? (
                    <NButton text text-color={vars.value.disableTextColor} onClick={e => onSelecter('disable', row)}>
                        {{ default: () => '禁用' }}
                    </NButton>
                ) : null}
            </NButtonGroup>
        )
    }

    /**空占位列**/
    const divineColumn = (value: unknown, style?: CSSProperties) => {
        return (
            value || (
                <div style={{ display: 'flex', ...style }}>
                    {h(Icon, { size: 20, depth: 3, component: compute('DashOutlined') })}
                </div>
            )
        )
    }

    /**状态列**/
    const onlineColumn = (status: number, t?: unknown) => {
        const BaseColumn = {
            0: (text?: unknown) => {
                const { disableBackColor: color, disableTextColor, disableBorderColor } = vars.value
                return (
                    <NTag
                        size="small"
                        color={{ color, textColor: disableTextColor, borderColor: disableBorderColor }}
                        style={online.value}
                        v-slots={{ default: () => text ?? '禁用' }}
                    ></NTag>
                )
            },
            1: (text?: unknown) => {
                const { enableBackColor, enableTextColor, enableBorderColor } = vars.value
                return (
                    <NTag
                        size="small"
                        color={{ color: enableBackColor, textColor: enableTextColor, borderColor: enableBorderColor }}
                        style={online.value}
                        v-slots={{ default: () => text ?? '启用' }}
                    ></NTag>
                )
            }
        }

        return BaseColumn[status as keyof typeof BaseColumn]?.(t) ?? divineColumn(status)
    }

    return {
        online,
        divineColumn,
        onlineColumn,
        chunkColumn,
        calcColumn
    }
}
