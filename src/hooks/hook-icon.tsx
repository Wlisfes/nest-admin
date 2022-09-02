import { h, Component } from 'vue'
import { NIcon as Icon } from 'naive-ui'
import {
    LeftOutlined,
    RightOutlined,
    MenuOutlined,
    UserOutlined,
    DashboardOutlined,
    LogoutOutlined,
    LoginOutlined,
    LockOutlined,
    VerifiedOutlined,
    CloseOutlined,
    ReloadOutlined,
    ColumnWidthOutlined,
    LineOutlined,
    EyeOutlined,
    StarOutlined,
    CommentOutlined,
    GithubOutlined,
    LinkOutlined,
    MediumOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SearchOutlined,
    BellOutlined,
    SoundOutlined,
    BankOutlined,
    SettingOutlined,
    CheckOutlined,
    HomeOutlined,
    SecurityScanOutlined,
    KeyOutlined,
    CloudUploadOutlined,
    CarryOutOutlined,
    ScheduleOutlined,
    ApartmentOutlined,
    PicCenterOutlined,
    FileImageOutlined,
    CloudOutlined,
    VideoCameraOutlined,
    InstagramOutlined,
    RadarChartOutlined,
    TrophyOutlined,
    WalletOutlined,
    TagOutlined,
    DashOutlined,
    EditOutlined,
    DeleteOutlined,
    MailOutlined,
    DownloadOutlined,
    ScissorOutlined,
    UploadOutlined,
    FileAddOutlined,
    VideoCameraAddOutlined,
    PlaySquareOutlined
} from '@vicons/antd'

export const Icons = {
    LocationOutlined: h(
        <svg viewBox="0 0 1024 1024">
            <path d="M854.6 289.1c-18.8-43.4-45.7-82.3-79.9-115.7-34.2-33.4-73.9-59.5-118.2-77.8C610.7 76.6 562.1 67 512 67c-50.1 0-98.7 9.6-144.5 28.5-44.3 18.3-84 44.5-118.2 77.8-34.2 33.4-61.1 72.4-79.9 115.7-19.5 45-29.4 92.8-29.4 142 0 70.6 16.9 140.9 50.1 208.7 26.7 54.5 64 107.6 111 158.1 80.3 86.2 164.5 138.9 188.4 153 6.9 4.1 14.7 6.1 22.4 6.1 7.8 0 15.5-2 22.4-6.1 23.9-14.1 108.1-66.8 188.4-153 47-50.4 84.3-103.6 111-158.1C867.1 572 884 501.8 884 431.1c0-49.2-9.9-97-29.4-142zM512 880.2c-65.9-41.9-300-207.8-300-449.1 0-77.9 31.1-151.1 87.6-206.3C356.3 169.5 431.7 139 512 139s155.7 30.5 212.4 85.9C780.9 280 812 353.2 812 431.1c0 241.3-234.1 407.2-300 449.1z"></path>
            <path d="M512 263c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176z m79.2 255.2C570 539.3 541.9 551 512 551c-29.9 0-58-11.7-79.2-32.8C411.7 497 400 468.9 400 439c0-29.9 11.7-58 32.8-79.2C454 338.6 482.1 327 512 327c29.9 0 58 11.6 79.2 32.8C612.4 381 624 409.1 624 439c0 29.9-11.6 58-32.8 79.2z"></path>
        </svg>
    ),
    CheckedOutlined: h(
        <svg viewBox="0 0 512 512">
            <path d="M234 26h44v92h-44z"></path>
            <path d="M234 394h44v92h-44z"></path>
            <path d="M338.025 142.857l65.054-65.054l31.113 31.113l-65.054 65.054z"></path>
            <path d="M77.815 403.074l65.054-65.054l31.113 31.113l-65.054 65.054z"></path>
            <path d="M394 234h92v44h-92z"></path>
            <path d="M26 234h92v44H26z"></path>
            <path d="M338.029 369.14l31.112-31.113l65.054 65.054l-31.112 31.112z"></path>
            <path d="M77.802 108.92l31.113-31.113l65.054 65.054l-31.113 31.112z"></path>
            <path d="M256 358a102 102 0 1 1 102-102a102.12 102.12 0 0 1-102 102z"></path>
        </svg>
    ),
    UnCheckedOutlined: h(
        <svg viewBox="0 0 512 512">
            <path d="M264 480A232 232 0 0 1 32 248c0-94 54-178.28 137.61-214.67a16 16 0 0 1 21.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200c31.34 0 59.57-5.07 81.61-14.67a16 16 0 0 1 21.06 21.06C442.28 426 358 480 264 480z"></path>
        </svg>
    ),
    LeftOutlined,
    RightOutlined,
    MenuOutlined,
    UserOutlined,
    DashboardOutlined,
    LogoutOutlined,
    LoginOutlined,
    LockOutlined,
    VerifiedOutlined,
    CloseOutlined,
    ReloadOutlined,
    ColumnWidthOutlined,
    LineOutlined,
    EyeOutlined,
    StarOutlined,
    CommentOutlined,
    GithubOutlined,
    LinkOutlined,
    MediumOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SearchOutlined,
    BellOutlined,
    SoundOutlined,
    BankOutlined,
    SettingOutlined,
    CheckOutlined,
    HomeOutlined,
    SecurityScanOutlined,
    KeyOutlined,
    CloudUploadOutlined,
    CarryOutOutlined,
    ScheduleOutlined,
    ApartmentOutlined,
    PicCenterOutlined,
    FileImageOutlined,
    CloudOutlined,
    VideoCameraOutlined,
    InstagramOutlined,
    RadarChartOutlined,
    TrophyOutlined,
    WalletOutlined,
    TagOutlined,
    DashOutlined,
    EditOutlined,
    DeleteOutlined,
    MailOutlined,
    DownloadOutlined,
    ScissorOutlined,
    UploadOutlined,
    FileAddOutlined,
    VideoCameraAddOutlined,
    PlaySquareOutlined
}

export function useRxicon() {
    const compute = (name: keyof typeof Icons): Component => {
        return h(Icons[name])
    }

    return { Icon, compute }
}
