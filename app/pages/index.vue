<script setup lang="ts">
const route = useRoute()

const page = computed(() => Math.max(1, Number(route.query.page) || 1))
const q = computed(() => (typeof route.query.q === 'string' ? route.query.q.trim() : ''))

const {data, pending} = await useFetch<VideosListResponse>(
    '/api/videos',
    {
      query: computed(() => ({
        page: page.value,
        ...(q.value ? {q: q.value} : {}),
      })),
    },
)

const videos = computed(() => {
  if (!data.value) return []
  if ((data.value.query ?? '') !== q.value) return []
  return data.value.videos
})

const showPagination = computed(() => videos.value.length > 0)

useSeoMeta({
  title: () => (q.value ? `جستجو: ${q.value} | تبدیل` : 'ویدیوهای آپارات تبدیل'),
  description: 'فهرست ویدیوهای کانال صرافی تبدیل در آپارات',
})
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 pb-10 md:px-6">
    <div
        v-if="pending && !videos.length"
        class="grid grid-cols-1 gap-4 py-6 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
    >
      <div
          v-for="n in 9"
          :key="n"
          class="animate-pulse overflow-hidden rounded-xl bg-surface-card"
      >
        <div class="aspect-video bg-surface-elevated"/>
        <div class="space-y-3 p-4">
          <div class="h-4 w-3/4 rounded bg-surface-elevated"/>
          <div class="h-3 w-1/2 rounded bg-surface-elevated"/>
          <div class="h-3 w-2/3 rounded bg-surface-elevated"/>
        </div>
      </div>
    </div>

    <template v-else>
      <p
          v-if="q"
          class="mb-4 text-sm text-muted"
      >
        نتایج جستجو برای «{{ q }}»
      </p>

      <div
          v-if="videos.length"
          class="grid grid-cols-1 gap-4 py-2 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
      >
        <VideoCard
            v-for="video in videos"
            :key="video.uid"
            :video="video"
        />
      </div>

      <div
          v-else
          class="mt-8 rounded-xl border border-white/10 bg-surface-card px-4 py-4 text-center text-muted md:mt-16 md:py-16"
      >
        ویدیویی یافت نشد
      </div>

      <Pagination
          v-if="showPagination && data"
          :page="data.page"
          :total-pages="data.totalPages"
          :has-next="data.hasNext"
          :has-prev="data.hasPrev"
      />
    </template>
  </main>
</template>
