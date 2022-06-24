<script lang="tsx">
import { defineComponent, ref, computed, CSSProperties, PropType } from 'vue'

const getInitials = (username: string) => {
    let parts = username.split(/[ -]/)
    let initials = ''
    for (var i = 0; i < parts.length; i++) {
        initials += parts[i].charAt(0)
    }
    if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
        initials = initials.replace(/[a-z]+/g, '')
    }
    initials = initials.substr(0, 3).toUpperCase()
    return initials
}

export default defineComponent({
    name: 'UAvatar',
    props: {
        username: {
            type: String
        },
        initials: {
            type: String
        },
        backgroundColor: {
            type: String
        },
        color: {
            type: String
        },
        customStyle: {
            type: Object
        },
        inline: {
            type: Boolean
        },
        size: {
            type: Number,
            default: 50
        },
        src: {
            type: String
        },
        rounded: {
            type: Boolean,
            default: true
        },
        lighten: {
            type: Number,
            default: 80
        },
        parser: {
            type: Function,
            default: getInitials,
            validator: (parser: Function) => typeof parser('John', getInitials) === 'string'
        }
    },
    setup(props) {
        const imgError = ref<boolean>(false)
        const backgroundColors = ref<Array<string>>([
            ...['#F44336', '#FF4081', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688'],
            ...['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B']
        ])

        const isImage = computed(() => !imgError.value && Boolean(props.src))
        const background = computed(() => {
            if (!isImage.value) {
                return (
                    props.backgroundColor || randomBackgroundColor(props.username?.length || 0, backgroundColors.value)
                )
            }
        })
        const fontColor = computed(() => {
            if (!isImage.value) {
                return props.color || lightenColor(background.value as string, props.lighten)
            }
        })
        const style = computed<CSSProperties>(() => {
            const u: CSSProperties = {
                display: props.inline ? 'inline-flex' : 'flex',
                width: `${props.size}px`,
                height: `${props.size}px`,
                borderRadius: props.rounded ? '50%' : 0,
                lineHeight: `${props.size + Math.floor(props.size / 20)}px`,
                fontWeight: 'bold',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                userSelect: 'none'
            }
            const imgBackgroundAndFontStyle = {
                background: `transparent url('${props.src}') no-repeat scroll 0% 0% / ${props.size}px ${props.size}px content-box border-box`
            }

            const initialBackgroundAndFontStyle = {
                backgroundColor: background.value,
                font: `${Math.floor(props.size / 2.5)}px/${props.size}px Helvetica, Arial, sans-serif`,
                color: fontColor.value
            }

            const backgroundAndFontStyle = isImage.value ? imgBackgroundAndFontStyle : initialBackgroundAndFontStyle

            return { ...u, ...backgroundAndFontStyle }
        })
        const userInitial = computed(() => {
            if (!isImage.value) {
                const initials = props.initials || props.parser(props.username, getInitials)
                return initials
            }
            return ''
        })

        const randomBackgroundColor = (seed: number, colors: Array<string>) => {
            return colors[seed % colors.length]
        }

        const lightenColor = (hex: string, amt: number) => {
            var usePound = false
            if (hex[0] === '#') {
                hex = hex.slice(1)
                usePound = true
            }
            var num = parseInt(hex, 16)
            var r = (num >> 16) + amt
            if (r > 255) r = 255
            else if (r < 0) r = 0
            var b = ((num >> 8) & 0x00ff) + amt
            if (b > 255) b = 255
            else if (b < 0) b = 0
            var g = (num & 0x0000ff) + amt
            if (g > 255) g = 255
            else if (g < 0) g = 0
            return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
        }

        return () => (
            <div aria-hidden="true" class="u-avatar" style={{ ...style.value, ...props.customStyle }}>
                {isImage.value ? <img style="display: none" src={props.src} /> : <span>{userInitial.value}</span>}
            </div>
        )
    }
})
</script>
