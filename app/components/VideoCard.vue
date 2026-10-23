<script setup lang="ts">
defineProps<{ video: VideoCardDto }>()
</script>

<template>
  <NuxtLink
      :to="`/video/${video.uid}`"
      class="group flex flex-col overflow-hidden rounded-xl border border-white/5 bg-surface-card transition-colors hover:border-white/15"
  >
    <div class="relative aspect-video overflow-hidden bg-surface-elevated">
      <img
          :src="video.poster"
          :alt="video.title"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
      >
      <span
          class="absolute bottom-2 left-2 rounded bg-black/75 px-1.5 py-0.5 text-xs font-medium tabular-nums text-white"
      >
        {{ formatDuration(video.duration) }}
      </span>
    </div>

    <div class="flex flex-1 flex-col gap-2 p-3 md:p-4">
      <h3 class="line-clamp-2 text-sm font-bold leading-6 text-white md:text-base">
        {{ video.title }}
      </h3>

      <div class="mt-auto flex items-center gap-2">
        <img
            v-if="video.profilePhoto"
            :src="video.profilePhoto"
            :alt="video.senderName"
            class="h-6 w-6 rounded-full object-cover"
            loading="lazy"
        >
        <span
            v-else
            class="flex h-6 w-6 items-center justify-center rounded-full bg-brand-yellow/20 text-xs text-brand-yellow"
        >
          {{ video.senderName?.charAt(0) || '?' }}
        </span>
        <span class="truncate text-sm text-white/90">
          {{ video.senderName }}
        </span>
      </div>

      <p class="text-xs text-muted md:text-sm">
        {{ formatViews(video.visitCount) }} بازدید
        <span class="mx-1">-</span>
        {{ video.relativeTime || video.sdate }}
      </p>
    </div>
  </NuxtLink>
</template>
