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
          class="flex shrink-0 items-center gap-2 rounded-[4px] bg-[#4F5154] px-3 py-2"
          title="لایک ها"
      >
        <span class="text-xs tabular-nums">{{ formatViews(video.likeCount) }}</span>
        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M9.16073 1.43238C7.21081 -0.271689 4.3271 -0.620402 2.08768 1.29301C-0.334647 3.36269 -0.686589 6.84837 1.22893 9.31324C1.95603 10.2489 3.37519 11.6545 4.73904 12.9418C6.11885 14.2442 7.49547 15.4749 8.17436 16.0761L8.18728 16.0876C8.25111 16.1441 8.33057 16.2146 8.40675 16.2719C8.49795 16.3406 8.62888 16.4259 8.80371 16.478C9.03614 16.5474 9.28597 16.5474 9.5184 16.478C9.69324 16.4259 9.82416 16.3406 9.91536 16.2719C9.99154 16.2146 10.071 16.1441 10.1348 16.0876L10.1478 16.0761C10.8266 15.4749 12.2033 14.2442 13.5831 12.9418C14.9469 11.6545 16.3661 10.2489 17.0932 9.31324C19.0013 6.85784 18.7038 3.34528 16.2258 1.2857C13.9614 -0.596323 11.1085 -0.272337 9.16073 1.43238ZM8.52779 3.15642C7.1069 1.49528 4.84833 1.12642 3.17034 2.56014C1.41758 4.05773 1.18173 6.53638 2.54493 8.29054C3.18084 9.10883 4.50567 10.4297 5.88305 11.7298C7.16892 12.9435 8.45516 14.097 9.16106 14.7235C9.86696 14.097 11.1532 12.9435 12.4391 11.7298C13.8164 10.4297 15.1413 9.10883 15.7772 8.29054C17.1477 6.52691 16.9293 4.03762 15.1604 2.56744C13.438 1.13583 11.2089 1.50262 9.79432 3.15642C9.636 3.34151 9.40462 3.44807 9.16106 3.44807C8.91749 3.44807 8.68611 3.34151 8.52779 3.15642Z"
              fill-rule="evenodd" clip-rule="evenodd" fill="#EAEAEA"/>
        </svg>
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

    <p v-if="video.description" class="whitespace-pre-line text-sm leading-7 text-white/85 md:text-base">
      {{ video.description }}
    </p>
  </div>
</template>
