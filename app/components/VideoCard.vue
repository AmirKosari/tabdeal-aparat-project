<script setup lang="ts">
defineProps<{ video: VideoCardDto }>()
</script>

<template>
  <NuxtLink
      :to="`/video/${video.uid}`"
      class="group flex flex-col overflow-hidden rounded-2xl p-4 gap-4 border border-[#404244] transition-colors hover:border-white/15"
  >
    <div class="relative aspect-video overflow-hidden rounded-lg bg-[#404244]">
      <img
          :src="video.poster"
          :alt="video.title"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
      >
      <span
          class="absolute bottom-4 left-4 rounded-[45px] px-[10px] pt-4 pb-3 leading-none bg-[#2F3337] text-[#E3E3E3]">
        {{ formatDuration(video.duration) }}
      </span>
    </div>

    <div class="flex flex-1 flex-col gap-3">
      <h3 class="line-clamp-2 text-lg font-bold leading-6 text-white md:text-xl">
        {{ video.title }}
      </h3>

      <div class="mt-auto flex items-center gap-2">
        <img v-if="video.profilePhoto" :src="video.profilePhoto" :alt="video.senderName"
             class="h-5 w-5 rounded-full object-cover" loading="lazy">
        <span v-else
              class="flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow/20 text-xs text-brand-yellow">
          {{ video.senderName?.charAt(0) || '?' }}
        </span>
        <span class="truncate text-secondary text-sm md:text-base">
          {{ video.senderName }}
        </span>
      </div>

      <p class="text-muted text-sm md:text-base">
        {{ video.visitCount }} بازدید
        <span class="mx-1">-</span>
        {{ video.relativeTime || video.sdate }}
      </p>
    </div>
  </NuxtLink>
</template>
