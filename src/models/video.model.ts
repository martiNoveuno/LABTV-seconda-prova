export interface VideoResponse {
    id: number
    results: VideoModel[]
  }
  
  export interface VideoModel {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
  }