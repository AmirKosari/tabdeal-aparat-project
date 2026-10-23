export default defineCachedEventHandler(
    async (event): Promise<VideosListResponse> => {
        const query = getQuery(event)
        const page = Math.max(1, Number(query.page) || 1)
        const q = typeof query.q === 'string' ? query.q.trim() : ''

        const channel = await getCachedChannel()

        if (q.length > 0 && q.length < 3) {
            throw createError({
                statusCode: 400,
                statusMessage: 'متن جستجو باید حداقل ۳ حرف باشد',
            })
        }

        if (q.length >= 3) {
            const result = await searchChannelVideos({query: q, page})
            const hasVideos = result.videos.length > 0
            const hasNext = hasVideos && Boolean(result.ui.pagingForward)
            return {
                videos: result.videos,
                page: result.page,
                perPage: result.perPage,
                totalPages: hasNext ? result.page + 1 : result.page,
                totalVideos: channel.videoCount,
                query: q,
                hasNext,
                hasPrev: hasVideos && page > 1,
            }
        }

        const result = await fetchVideosByUser({page})
        const totalPages = Math.max(1, Math.ceil(channel.videoCount / result.perPage))

        return {
            videos: result.videos,
            page: result.page,
            perPage: result.perPage,
            totalPages,
            totalVideos: channel.videoCount,
            query: null,
            hasNext: page < totalPages || Boolean(result.ui.pagingForward),
            hasPrev: page > 1,
        }
    },
    {
        maxAge: 60,
        name: 'aparat-videos',
        getKey: (event) => {
            const q = getQuery(event)
            return `p=${q.page || 1}&q=${typeof q.q === 'string' ? q.q : ''}`
        },
    },
)
