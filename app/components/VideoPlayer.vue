<script setup lang="ts">
const props = defineProps<{
  frameUrl: string
  title: string
}>()

const embedSrc = computed(() => {
  if (!props.frameUrl) return ''
  try {
    const url = new URL(props.frameUrl)
    url.searchParams.set('titleShow', 'false')
    return url.toString()
  } catch {
    return props.frameUrl
  }
})
</script>

<template>
  <div class="relative aspect-video w-full overflow-hidden rounded-xl bg-surface-elevated">
    <iframe
        v-if="embedSrc"
        :src="embedSrc"
        :title="title"
        class="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        loading="lazy"
    />
    <div
        v-else
        class="flex h-full items-center justify-center text-muted"
    >
      پخش‌کننده ویدیو در دسترس نیست
    </div>
  </div>
</template>
