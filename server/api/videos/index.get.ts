export default defineCachedEventHandler(
    async (event): Promise<VideosListResponse> => {
        const query = getQuery(event)
        const page = Math.max(1, Number(query.page) || 1)
        const q = typeof query.q === 'string' ? query.q.trim() : ''

        if (q.length > 0 && q.length < 3) {
            throw createError({
                statusCode: 400,
                message: 'متن جستجو باید حداقل ۳ حرف باشد',
            })
        }

        if (q.length >= 3) {
            const result = await searchChannelVideos({query: q, page})
            const totalPages = Math.max(1, Math.ceil(result.total / result.perPage))
            return {
                videos: result.videos,
                page: result.page,
                perPage: result.perPage,
                totalPages,
                totalVideos: result.total,
                query: q,
                hasNext: result.page < totalPages,
                hasPrev: result.page > 1,
            }
        }

        const result = await fetchVideosByUser({page})
        const totalPages = Math.max(1, Math.ceil(result.total / result.perPage))

        return {
            videos: result.videos,
            page: result.page,
            perPage: result.perPage,
            totalPages,
            totalVideos: result.total,
            query: null,
            hasNext: result.page < totalPages,
            hasPrev: result.page > 1,
        }
    },
    {
        maxAge: 60,
        name: 'aparat-videos',
        getKey: (event) => {
            const query = getQuery(event)
            const page = Math.max(1, Number(query.page) || 1)
            const text = typeof query.q === 'string' ? query.q : ''
            return `p${page}_q${encodeURIComponent(text)}`
        },
    },
)
