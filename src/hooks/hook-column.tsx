import type { DropdownOption } from 'naive-ui'
import type { IProvider } from '@/api/pipe'
import { NTag, NText, NButtonGroup, NButton, NPopover, NDivider, NDropdown } from 'naive-ui'
import { h, ref, CSSProperties } from 'vue'
import { Icons, useCompute } from '@/hooks/hook-icon'
import { useProvider } from '@/hooks/hook-provider'

type IChunkCter = 'edit' | 'reset' | 'disable' | 'enable'
type IOption = { label: string; key: IChunkCter; icon: keyof typeof Icons; color: string }
type IChunk<T> = {
    row: IProvider & T
    onSelecter: (key: IChunkCter, row: T) => void
}

export function useColumn() {
    const { vars } = useProvider()
    const { Icon, compute } = useCompute()
    const options = ref<Array<IOption | DropdownOption>>([
        { label: '编辑', key: 'edit', icon: 'EditOutlined', color: '#1890ff' },
        { label: '重置密码', key: 'reset', icon: 'ReloadOutlined', color: '#f5222d' }
    ])

    /**计算列百分比**/
    const calcColumn = (width: number, max: number = 1080) => {
        return (width / max) * 100 + '%'
    }

    /**操作列**/
    const chunkColumn = <T,>({ row, onSelecter }: IChunk<T>) => {
        return (
            <NButtonGroup>
                <NDropdown
                    options={options.value as Array<DropdownOption>}
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
    const onlineColumn = (status: number) => {
        const u: CSSProperties = { cursor: 'pointer', height: '24px', userSelect: 'none' }
        if (status === 0) {
            return h(
                NTag,
                {
                    color: {
                        color: vars.value.disableBackColor,
                        textColor: vars.value.disableTextColor,
                        borderColor: vars.value.disableBorderColor
                    },
                    style: { ...u }
                },
                { default: () => '禁用' }
            )
        } else if (status === 1) {
            return h(
                NTag,
                {
                    color: {
                        color: vars.value.enableBackColor,
                        textColor: vars.value.enableTextColor,
                        borderColor: vars.value.enableBorderColor
                    },
                    style: { ...u }
                },
                { default: () => '启用' }
            )
        }
    }

    return { divineColumn, onlineColumn, chunkColumn, calcColumn }
}