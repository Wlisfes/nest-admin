export type NDemanBase = {
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

export type NDemanRate = {
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

export type NMezzanine = {
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

export type IDemanOption = {
	RequestId: string
	base: NDemanBase
	list: Array<NDemanRate>
}

export type IDemanFileOption = {
	RequestId: string
	Mezzanine: NMezzanine
}
