<script setup lang="ts">
defineProps<{
  video: VideoDetailDto
  channel?: ChannelResponse | null
}>()
</script>

<template>
  <div class="mt-5 space-y-4 md:mt-6">
    <div class="flex items-start justify-between gap-4">
      <h1 class="flex-1 text-xl font-bold leading-8 text-white md:text-2xl lg:text-3xl">
        {{ video.title }}
      </h1>

      <div
          class="flex shrink-0 flex-col items-center gap-1 rounded-lg border border-white/10 bg-surface-elevated px-3 py-2 text-muted"
          title="لایک ها"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            class="h-5 w-5"
            aria-hidden="true"
        >
          <path
              d="M12 21s-6.5-4.2-9-8.2C1.2 9.6 2.8 6 6.2 6c1.9 0 3.2 1.1 3.8 2.1C10.6 7.1 11.9 6 13.8 6c3.4 0 5 3.6 3.2 6.8C18.5 16.8 12 21 12 21z"
              stroke-linejoin="round"
          />
        </svg>
        <span class="text-xs tabular-nums">{{ formatViews(video.likeCount) }}</span>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <img
          v-if="channel?.avatar || video.profilePhoto"
          :src="channel?.avatar || video.profilePhoto"
          :alt="channel?.name || video.senderName"
          class="h-11 w-11 rounded-full object-cover"
      >
      <div>
        <p class="font-semibold text-white">
          {{ channel?.name || video.senderName }}
        </p>
        <p v-if="channel?.followerCount" class="text-sm text-muted">
          {{ channel.followerCount }} دنبال‌کننده
        </p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
      <span>{{ formatViews(video.visitCount) }} بازدید</span>
      <span aria-hidden="true">·</span>
      <span>{{ video.relativeTime || video.sdate }}</span>
      <template v-if="video.tags.length">
        <span
            v-for="tag in video.tags"
            :key="tag"
            class="text-tag"
        >
          #{{ tag }}
        </span>
      </template>
    </div>

    <p
        v-if="video.description"
        class="whitespace-pre-line text-sm leading-7 text-white/85 md:text-base"
    >
      {{ video.description }}
    </p>
  </div>
</template>
