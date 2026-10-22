export interface AparatVideoListItem {
    id: string
    title: string
    username: string
    userid: string
    visit_cnt: number
    uid: string
    process: string
    sender_name: string
    big_poster: string
    small_poster: string
    profilePhoto: string
    duration: number
    sdate: string
    create_date?: string
    sdate_timediff?: number
    frame: string
    official: string
    autoplay?: boolean
}

export interface AparatVideoDetail extends AparatVideoListItem {
    description: string
    tags: string[] | null
    tag_str: string | null
    like_cnt: number
    cat_name?: string
    has_comment?: string
}

export interface AparatProfile {
    pic_s: string
    pic_m: string
    pic_b: string
    username: string
    userid: number
    name: string
    video_cnt: string
    follower_cnt: string
    followed_cnt: string
    descr: string
    official: string
    profile_videos?: string
}

export interface AparatUi {
    pagingForward: string | null
    pagingBack: string | null
}

export interface ChannelResponse {
    username: string
    name: string
    avatar: string
    followerCount: string
    videoCount: number
    description: string
}

export interface VideoCardDto {
    uid: string
    title: string
    username: string
    senderName: string
    poster: string
    profilePhoto: string
    duration: number
    visitCount: number
    sdate: string
    relativeTime: string
}

export interface VideoDetailDto extends VideoCardDto {
    description: string
    tags: string[]
    likeCount: number
    frame: string
}

export interface VideosListResponse {
    videos: VideoCardDto[]
    page: number
    perPage: number
    totalPages: number
    totalVideos: number
    query: string | null
    hasNext: boolean
    hasPrev: boolean
}
