async function aparatFetch<T>(path: string): Promise<T> {
    const base = (useRuntimeConfig().aparatBaseUrl as string).replace(/\/$/, '')
    const url = `${base}/${path.replace(/^\//, '')}`

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

function mapVideoCard(item: AparatVideoListItem): VideoCardDto {
    return {
        uid: item.uid,
        title: item.title,
        username: item.username,
        senderName: item.sender_name || item.username,
        poster: ensureHttps(item.big_poster || item.small_poster),
        profilePhoto: ensureHttps(item.profilePhoto),
        duration: Number(item.duration) || 0,
        visitCount: Number(item.visit_cnt) || 0,
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

export async function fetchVideosByUser(options: {
    page?: number
}): Promise<{ videos: VideoCardDto[], ui: AparatUi, page: number, perPage: number }> {
    const page = Math.max(1, options.page || 1)
    const perPage = 9
    const offset = (page - 1) * perPage

    let path = `videoByUser/username/tabdealplatform/perpage/${perPage}`
    if (offset > 0) {
        path += `/curoffset/${offset}`
    }

    const data = await aparatFetch<{
        videobyuser?: AparatVideoListItem[]
        videoByUser?: AparatVideoListItem[]
        ui?: AparatUi
    }>(path)

    const list = data.videobyuser || data.videoByUser || []

    return {
        videos: list.map(mapVideoCard),
        ui: data.ui || {pagingForward: null, pagingBack: null},
        page,
        perPage,
    }
}

export async function searchChannelVideos(options: {
    query: string
    page?: number
}): Promise<{ videos: VideoCardDto[], ui: AparatUi, page: number, perPage: number }> {
    const page = Math.max(1, options.page || 1)
    const perPage = 9
    const text = options.query.trim()

    const fetchSize = Math.max(perPage * 5, 30)
    const offset = (page - 1) * fetchSize

    let path = `videoBySearch/text/${encodeURIComponent(text)}/perpage/${fetchSize}`
    if (offset > 0) {
        path += `/curoffset/${offset}`
    }

    const data = await aparatFetch<{
        videobysearch: AparatVideoListItem[]
        ui: AparatUi
    }>(path)

    const filtered = (data.videobysearch || [])
        .filter(v => v.username?.toLowerCase() === 'tabdealplatform')
        .map(mapVideoCard)
        .slice(0, perPage)

    return {
        videos: filtered,
        ui: data.ui || {pagingForward: null, pagingBack: null},
        page,
        perPage,
    }
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
