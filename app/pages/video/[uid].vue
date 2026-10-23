<script setup lang="ts">
const route = useRoute()
const uid = computed(() => String(route.params.uid || ''))

const {data: video, pending, error, refresh} = await useFetch<VideoDetailDto>(
    () => `/api/videos/${uid.value}`,
)

const {data: channel} = await useFetch<ChannelResponse>('/api/channel')

useSeoMeta({
  title: () => (video.value ? `${video.value.title} | تبدیل` : 'ویدیو | تبدیل'),
  description: () => video.value?.description?.slice(0, 160) || 'پخش ویدیو از کانال تبدیل',
  ogImage: () => video.value?.poster,
})
</script>

<template>
  <main class="mx-auto w-full max-w-[1920px] px-4 py-6 md:px-[120px] md:py-8">
    <div
        v-if="pending && !video"
        class="animate-pulse space-y-4 md:rounded-2xl md:border md:border-white/10 md:p-6"
    >
      <div class="aspect-video rounded-xl bg-surface-elevated"/>
      <div class="h-7 w-2/3 rounded bg-surface-elevated"/>
      <div class="h-4 w-1/3 rounded bg-surface-elevated"/>
      <div class="h-20 w-full rounded bg-surface-elevated"/>
    </div>

    <div
        v-else-if="error"
        class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-8 text-center"
    >
      <p class="mb-4 text-red-300">
        {{ error.message || 'ویدیو یافت نشد' }}
      </p>
      <div class="flex justify-center gap-3">
        <NuxtLink
            to="/"
            class="rounded-lg border border-white/20 px-4 py-2 text-sm"
        >
          بازگشت به فهرست
        </NuxtLink>
        <button
            type="button"
            class="rounded-lg bg-brand-yellow px-4 py-2 text-sm font-bold text-black"
            @click="refresh()"
        >
          تلاش مجدد
        </button>
      </div>
    </div>

    <article
        v-else-if="video"
        class="flex flex-col md:rounded-2xl md:border md:border-white/10 md:p-6 gap-6 md:gap-8"
    >
      <VideoPlayer
          :frame-url="video.frame"
          :title="video.title"
      />
      <VideoInfo
          :video="video"
          :channel="channel"
      />
    </article>
  </main>
</template>
