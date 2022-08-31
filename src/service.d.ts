interface IProvider {
    createTime: string
    updateTime: string
    status: number
    total: number
    page: number
    size: number
    message: string
}

interface IBanner {
    start: string
    end: string
    cover: string
    name: string
    search: string
}

interface NDemanBase {
    VideoId: string
    CoverURL: string
    Duration: number
    MediaType: string
    OutputType: string
    Status: string
    Title: string
    TranscodeMode: string
    CreationTime: string
}

interface NDemanRate {
    Bitrate: string
    CreationTime: string
    Definition: string
    Duration: string
    Encrypt: number
    Format: string
    Fps: string
    Height: number
    JobId: string
    ModificationTime: string
    NarrowBandType: string
    PlayURL: string
    PreprocessStatus: string
    Size: number
    Specification: string
    Status: string
    StreamType: string
    Width: number
}

interface NMezzanine {
    Bitrate: string
    CRC64: string
    CreationTime: string
    Duration: string
    FileName: string
    FileURL: string
    Fps: string
    Height: number
    OutputType: string
    PreprocessStatus: string
    Size: number
    Status: string
    VideoId: string
    Width: number
}

interface IDeman {
    RequestId: string
    base: NDemanBase
    list: Array<NDemanRate>
}

interface IDemanFile {
    RequestId: string
    Mezzanine: NMezzanine
}

interface IOss {
    accessKeyId: string
    accessKeySecret: string
    stsToken: string
    path: string
}

/*---------------------------------------------------------------------------*/
interface IUser extends IProvider {
    id: number
    uid: number
    account: number
    nickname: string
    email: string
    avatar: string
    comment: string
    mobile: number
    password: string
    status: number
    token: string
    role: Array<IRole>
    list: Array<IUser>
}

/*---------------------------------------------------------------------------*/
interface IArticle extends IProvider {
    id: number
    title: string
    cover: string
    content: string
    html: string
    description: string | null
    url: string
    status: number
    order: number
    browse: number
    comment: number
    star: { total: number; where: boolean }
    source: Array<ISource>
    list: Array<IArticle>
    user: IUser
}

/*---------------------------------------------------------------------------*/
interface IChunk extends IProvider {
    id: number
    url: string
    path: string
    name: string
    version: number
    status: number
    user: IUser
    list: Array<IChunk>
}

/*---------------------------------------------------------------------------*/
interface ICloud extends IProvider {
    id: number
    type: number
    title: string
    key: string
    name: string
    path: string
    cover: string
    status: number
    order: number
    size: number
    browse: number
    comment: number
    star: { total: number; where: boolean }
    description: string
    parent: ICloud
    user: IUser
    children: Array<ICloud>
    list: Array<ICloud>
}

/*---------------------------------------------------------------------------*/
interface IMinute extends IProvider {
    id: number
    name: string
    cover: string
    description: string | null
    url: string
    npm: string
    github: string
    status: number
    order: number
    source: Array<ISource>
    list: Array<IMinute>
    user: IUser
}

/*---------------------------------------------------------------------------*/
interface IPartner extends IProvider {
    id: number
    title: string
    content: string
    html: string
    status: number
    description: string
    cover: Array<IPoster>
    list: Array<IPartner>
    user: IUser
}

/*---------------------------------------------------------------------------*/
interface IPoster extends IProvider {
    id: number
    type: number
    url: string
    path: string
    status: number
    user: IUser
    list: Array<IPoster>
}

/*---------------------------------------------------------------------------*/
type IPrimary = 'admin' | 'dev' | 'visitor' | 'super'
interface IRole extends IProvider {
    id: number
    primary: string
    name: string
    status: number
    comment: string
    action: string[]
    list: Array<IRole>
}

/*---------------------------------------------------------------------------*/
interface IRoute extends IProvider {
    id: number
    type: number
    role: IRole[]
    name: string
    title: string
    router: string
    path: string
    keepAlive: number
    status: number
    hidden: number
    icon: string
    order: number
    parent: IRoute
    children: IRoute[]
}

/*---------------------------------------------------------------------------*/
interface ISource extends IProvider {
    id: number
    name: string
    icon: string
    color: string
    status: number
    order: number
    comment: string | null
}

/*---------------------------------------------------------------------------*/
interface ILogger extends IProvider {
    id: number
    referer: string
    ip: string
    path: string
    method: string
    type: number
    body: Object
    query: Object
    params: Object
    code: number
    message: string
    status: number
    user: IUser
    list: Array<ILogger>
}

/*---------------------------------------------------------------------------*/
interface IAction extends IProvider {
    id: number
    name: string
    primary: 'create' | 'update' | 'delete' | 'params' | 'list'
    comment: string
    list: Array<IAction>
}
