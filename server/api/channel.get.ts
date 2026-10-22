export default defineCachedEventHandler(
    async () => {
        return await fetchChannel()
    },
    {
        maxAge: 300,
        name: 'aparat-channel',
        getKey: () => 'default',
    },
)
