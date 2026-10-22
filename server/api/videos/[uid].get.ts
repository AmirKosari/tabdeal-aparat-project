export default defineCachedEventHandler(
    async (event) => {
        const uid = getRouterParam(event, 'uid')
        if (!uid) {
            throw createError({statusCode: 400, statusMessage: 'شناسه ویدیو نامعتبر است'})
        }
        return await fetchVideoByUid(uid)
    },
    {
        maxAge: 120,
        name: 'aparat-video',
        getKey: (event) => getRouterParam(event, 'uid') || 'unknown',
    },
)
