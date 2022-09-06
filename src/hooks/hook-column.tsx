import type { DropdownOption, TagProps, ImageProps } from 'naive-ui'
import type { IProvider } from '@/interface/api/http-provider'
import { NTag, NText, NButtonGroup, NButton, NDivider, NDropdown, NImage, NSkeleton } from 'naive-ui'
import { h, ref, computed, CSSProperties } from 'vue'
import { UScale } from '@/components/global'
import { Icons, useRxicon } from '@/hooks/hook-icon'
import { useProvider } from '@/hooks/hook-provider'

type IKCommand = 'edit' | 'reset' | 'disable' | 'enable' | 'delete'
type IOption = { label: string; key: IKCommand; icon: keyof typeof Icons; color: string }
type ICommand<T> = {
    row: IProvider & T
    native: Array<IKCommand>
    onSelecter?: (key: IKCommand, row: T) => void
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
    const online = computed<CSSProperties>(() => ({ cursor: 'pointer', height: '24px', userSelect: 'none' }))

    /**计算列百分比**/
    const calcColumn = (width: number, max: number = 1080) => {
        return (width / max) * 100 + '%'
    }

    /**操作列**/
    const chunkColumn = <T,>({ row, native, onSelecter }: ICommand<T>) => {
        const options: Array<IOption | DropdownOption> = [
            { label: '编辑', key: 'edit', icon: 'EditOutlined', color: '#1890ff' },
            { label: '删除', key: 'delete', icon: 'DeleteOutlined', color: '#ff4d4f' },
            { label: '重置密码', key: 'reset', icon: 'ReloadOutlined', color: '#f5222d' }
        ]
        const nativeOption = computed(() => native.map(key => options.find(x => key === x.key)))

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
                    onSelect={key => onSelecter?.(key, row)}
                >
                    {{ default: () => h(NButton, { type: 'info', text: true }, { default: () => '操作' }) }}
                </NDropdown>
                <NDivider vertical />
                {row.status === 0 ? (
                    <NButton text text-color={vars.value.enableTextColor} onClick={e => onSelecter?.('enable', row)}>
                        {{ default: () => '启用' }}
                    </NButton>
                ) : row.status === 1 ? (
                    <NButton text text-color={vars.value.disableTextColor} onClick={e => onSelecter?.('disable', row)}>
                        {{ default: () => '禁用' }}
                    </NButton>
                ) : null}
            </NButtonGroup>
        )
    }

    /**空占位列**/
    const divineColumn = (value: unknown, style?: CSSProperties) => {
        return ![undefined, null, ''].includes(value as never) ? (
            value
        ) : (
            <div style={{ display: 'flex', ...style }}>
                {h(Icon, { size: 20, depth: 3, component: compute('DashOutlined') })}
            </div>
        )
    }

    /**自定义类别标签**/
    const divineSpine = (value: string, tagProps: TagProps, style?: CSSProperties) => {
        return h(
            NTag,
            {
                ...tagProps,
                size: tagProps.size ?? 'small',
                style: { ...online.value, ...style },
                color: { textColor: '#ffffff', ...tagProps.color }
            },
            { default: () => value }
        )
    }

    /**再封装图片组件**/
    const divineImage = (imageProps: ImageProps & { scale: number }, style?: CSSProperties) => {
        return (
            <UScale maxWidth={imageProps.width} scale={imageProps.scale}>
                {h(
                    NImage,
                    {
                        ...imageProps,
                        style,
                        objectFit: 'cover',
                        showToolbarTooltip: true,
                        previewSrc: imageProps.previewSrc ?? imageProps.src,
                        src: imageProps.src + '?x-oss-process=style/resize'
                    },
                    { placeholder: () => <NSkeleton width="100%" height="100%" /> }
                )}
            </UScale>
        )
    }

    /**状态列**/
    const onlineColumn = (status: number, value?: any, style?: CSSProperties) => {
        const { disableBackColor, disableTextColor, disableBorderColor } = vars.value
        const { enableBackColor, enableTextColor, enableBorderColor } = vars.value
        const __BASE__ = {
            0: {
                value: '禁用',
                color: { color: disableBackColor, textColor: disableTextColor, borderColor: disableBorderColor }
            },
            1: {
                value: '启用',
                color: { color: enableBackColor, textColor: enableTextColor, borderColor: enableBorderColor }
            },
            2: {
                value: '删除',
                color: { color: disableBackColor, textColor: disableTextColor, borderColor: disableBorderColor }
            }
        }
        const node = __BASE__[status as keyof typeof __BASE__]

        if (!node ?? value ?? true) {
            return divineColumn(value)
        } else {
            return divineSpine(node.value ?? value, { size: 'small', color: node.color }, style)
        }
    }

    return {
        online,
        divineSpine,
        divineColumn,
        divineImage,
        onlineColumn,
        chunkColumn,
        calcColumn
    }
}
