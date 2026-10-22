<script setup lang="ts">
const props = defineProps<{
  page: number
  totalPages: number
  hasNext?: boolean
  hasPrev?: boolean
}>()

const route = useRoute()

const displayTotal = computed(() => Math.max(props.totalPages, props.page))

const pages = computed(() => {
  const total = displayTotal.value
  const current = props.page
  const maxVisible = 5

  if (total <= maxVisible + 1) {
    return Array.from({length: total}, (_, i) => i + 1)
  }

  const items: (number | 'ellipsis')[] = []
  const start = Math.max(1, current - 2)
  const end = Math.min(total, start + maxVisible - 1)
  const adjustedStart = Math.max(1, end - maxVisible + 1)

  if (adjustedStart > 1) {
    items.push(1)
    if (adjustedStart > 2) items.push('ellipsis')
  }

  for (let i = adjustedStart; i <= end; i++) {
    items.push(i)
  }

  if (end < total) {
    if (end < total - 1) items.push('ellipsis')
    items.push(total)
  }

  return items
})

function pageLink(page: number) {
  return {
    path: route.path,
    query: {
      ...route.query,
      page: page > 1 ? String(page) : undefined,
    },
  }
}

const canPrev = computed(() => props.hasPrev ?? props.page > 1)
const canNext = computed(() => props.hasNext ?? props.page < displayTotal.value)
</script>

<template>
  <nav
      v-if="displayTotal > 1 || canNext || canPrev"
      dir="ltr"
      style="direction: ltr"
      class="flex flex-wrap items-center justify-center gap-1 py-6 text-sm text-muted md:gap-2 md:text-base"
      aria-label="صفحه‌بندی"
  >
    <NuxtLink
        :to="pageLink(1)"
        :class="[
        'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
        canPrev ? 'text-[#E5E6E6] hover:text-white' : 'pointer-events-none text-[#E5E6E6] opacity-30',
      ]"
        aria-label="اولین صفحه"
    >
      <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
        <path d="M12.59 12L14 10.59L9.42 6L14 1.41L12.59 0L6.59 6L12.59 12Z" fill="currentColor"/>
        <path d="M6 12L7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12Z" fill="currentColor"/>
      </svg>
    </NuxtLink>
    <NuxtLink
        :to="pageLink(Math.max(1, page - 1))"
        :class="[
        'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
        canPrev ? 'text-[#E5E6E6] hover:text-white' : 'pointer-events-none text-[#E5E6E6] opacity-30',
      ]"
        aria-label="صفحه قبل"
    >
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
        <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z" fill="currentColor"/>
      </svg>
    </NuxtLink>

    <template v-for="(item, idx) in pages" :key="`${item}-${idx}`">
      <span v-if="item === 'ellipsis'" class="px-1">
        ...
      </span>
      <NuxtLink
          v-else
          :to="pageLink(item)"
          :class="[
          'flex h-9 w-9 items-center justify-center rounded-full font-medium transition-colors',
          item === page
            ? 'bg-brand-yellow text-black'
            : 'hover:text-white',
        ]"
          :aria-current="item === page ? 'page' : undefined"
      >
        {{ item }}
      </NuxtLink>
    </template>

    <NuxtLink
        :to="pageLink(page + 1)"
        :class="[
        'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
        canNext ? 'text-[#989A9C] hover:text-white' : 'pointer-events-none text-[#989A9C] opacity-30',
      ]"
        aria-label="صفحه بعد"
    >
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
        <path d="M0 10.59L4.58 6L0 1.41L1.41 0L7.41 6L1.41 12L0 10.59Z" fill="currentColor"/>
      </svg>
    </NuxtLink>
    <NuxtLink
        :to="pageLink(displayTotal)"
        :class="[
        'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
        canNext ? 'text-[#989A9C] hover:text-white' : 'pointer-events-none text-[#989A9C] opacity-30',
      ]"
        aria-label="آخرین صفحه"
    >
      <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
        <path d="M1.41 0L0 1.41L4.58 6L0 10.59L1.41 12L7.41 6L1.41 0Z" fill="currentColor"/>
        <path d="M8 0L6.59 1.41L11.17 6L6.59 10.59L8 12L14 6L8 0Z" fill="currentColor"/>
      </svg>
    </NuxtLink>
  </nav>
</template>

<style scoped>
nav {
  direction: ltr;
}
</style>
