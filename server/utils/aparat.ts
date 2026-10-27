import {AparatApiResponse} from "#shared/types/aparat.ts";

function buildUrl(base: string, path: string): string {
    return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

async function aparatRequest<T>(url: string): Promise<T> {
    let response: Response
    try {
        response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'User-Agent': 'TabdealAparatApp/1.0',
            },
            signal: AbortSignal.timeout(15_000),
        })
    } catch (error: unknown) {
        console.error('[aparat]', url, error)
        throw createError({
            statusCode: 502,
            message: 'خطا در دریافت اطلاعات از آپارات',
        })
    }

    if (!response.ok) {
        if (response.status === 404) {
            throw createError({statusCode: 404, message: 'یافت نشد'})
        }
        throw createError({
            statusCode: 502,
            message: `آپارات وضعیت ${response.status} برگرداند`,
        })
    }

    try {
        return await response.json() as T
    } catch (error: unknown) {
        console.error('[aparat]', url, error)
        throw createError({
            statusCode: 502,
            message: 'خطا در دریافت اطلاعات از آپارات',
        })
    }
}

function aparatFetch<T>(path: string): Promise<T> {
    const base = useRuntimeConfig().aparatBaseUrl as string
    return aparatRequest<T>(buildUrl(base, path))
}

function aparatFetchV1<T>(path: string): Promise<T> {
    const base = useRuntimeConfig().aparatV1BaseUrl as string
    return aparatRequest<T>(buildUrl(base, path))
}

function extractVideos(response: AparatApiResponse): AparatVideoListItem[] {
    return (response.included || []).filter(item => item.type === 'Video').map(item => item.attributes)
}

function mapVideoCard(item: AparatVideoListItem): VideoCardDto {
    return {
        uid: item.uid,
        title: item.title,
        username: item.username,
        senderName: item.sender_name || item.username,
        poster: ensureHttps(item.big_poster || item.small_poster),
        profilePhoto: ensureHttps(item.profilePhoto),
        duration: Number(item.duration) || 0,
        visitCount: Number(item.visit_cnt_int ?? item.visit_cnt) || 0,
        sdate: item.sdate,
        relativeTime: formatRelativeTime(item.sdate_timediff, item.sdate),
    }
}

function mapVideoDetail(item: AparatVideoDetail): VideoDetailDto {
    return {
        ...mapVideoCard(item),
        description: item.description || '',
        tags: parseTags(item.tag_str, item.tags),
        likeCount: Number(item.like_cnt) || 0,
        frame: ensureHttps(item.frame),
    }
}

export async function fetchChannel(): Promise<ChannelResponse> {
    const data = await aparatFetch<{ profile: AparatProfile }>(
        'profile/username/tabdealplatform',
    )
    const p = data.profile
    return {
        username: p.username,
        name: p.name,
        avatar: ensureHttps(p.pic_m || p.pic_b || p.pic_s),
        followerCount: p.follower_cnt,
        videoCount: Number(String(p.video_cnt).replace(/\D/g, '')) || 0,
        description: p.descr || '',
    }
}

export const getCachedChannel = defineCachedFunction(
    () => fetchChannel(),
    {
        maxAge: 300,
        name: 'aparat-channel',
        getKey: () => 'default',
    },
)

async function fetchUserVideosRaw(): Promise<AparatVideoListItem[]> {
    const data = await aparatFetchV1<AparatApiResponse>(
        'user/video/list/username/tabdealplatform',
    )
    return extractVideos(data)
}

const getCachedUserVideos = defineCachedFunction(
    () => fetchUserVideosRaw(),
    {
        maxAge: 300,
        name: 'aparat-user-videos',
        getKey: () => 'default',
    },
)

async function fetchSearchVideosRaw(text: string): Promise<AparatVideoListItem[]> {
    const data = await aparatFetchV1<AparatApiResponse>(
        `video/video/search/text/${encodeURIComponent(text)}/?channel=tabdealplatform`,
    )
    return extractVideos(data).filter(v => v.username?.toLowerCase() === 'tabdealplatform')
}

const getCachedSearchVideos = defineCachedFunction(
    (text: string) => fetchSearchVideosRaw(text),
    {
        maxAge: 300,
        name: 'aparat-search-videos',
        getKey: (text: string) => encodeURIComponent(text),
    },
)

function paginate(items: AparatVideoListItem[], page: number): {
    videos: VideoCardDto[],
    page: number,
    perPage: number,
    total: number
} {
    const start = (page - 1) * 9
    return {
        videos: items.slice(start, start + 9).map(mapVideoCard),
        page,
        perPage: 9,
        total: items.length,
    }
}

export async function fetchVideosByUser(options: { page?: number }): Promise<{
    videos: VideoCardDto[],
    page: number,
    perPage: number,
    total: number
}> {
    const page = Math.max(1, options.page || 1)
    const all = await getCachedUserVideos()
    return paginate(all, page)
}

export async function searchChannelVideos(options: { query: string, page?: number }): Promise<{
    videos: VideoCardDto[],
    page: number,
    perPage: number,
    total: number
}> {
    const page = Math.max(1, options.page || 1)
    const text = options.query.trim()
    const all = await getCachedSearchVideos(text)
    return paginate(all, page)
}

export async function fetchVideoByUid(uid: string): Promise<VideoDetailDto> {
    const data = await aparatFetch<{ video: AparatVideoDetail }>(
        `video/videohash/${encodeURIComponent(uid)}`,
    )
    if (!data.video) {
        throw createError({statusCode: 404, message: 'ویدیو یافت نشد'})
    }
    return mapVideoDetail(data.video)
}
