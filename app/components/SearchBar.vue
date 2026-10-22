<script setup lang="ts">
const route = useRoute()

const query = ref(typeof route.query.q === 'string' ? route.query.q : '')
const error = ref('')

watch(() => route.query.q, (q) => {
  query.value = typeof q === 'string' ? q : ''
})

async function submit() {
  const q = query.value.trim()
  error.value = ''

  if (q && q.length < 3) {
    error.value = 'متن جستجو باید حداقل ۳ حرف باشد'
    return
  }

  await navigateTo({
    path: '/',
    query: {
      ...(q ? {q} : {}),
      page: undefined,
    },
  })
}
</script>

<template>
  <form class="w-full" @submit.prevent="submit">
    <div class="flex h-20 w-full items-center justify-center gap-4 rounded-lg bg-[#2C2E30] p-4">
      <input
          v-model="query"
          type="search"
          name="q"
          dir="rtl"
          placeholder="جستجو ویدیو..."
          class="h-12 min-w-0 flex-1 rounded bg-[#3B3D3F] py-3 pe-2 ps-4 text-right text-sm font-normal leading-[21px] text-white placeholder:text-white focus:outline-none"
          autocomplete="off"
      >
      <button
          type="submit"
          class="flex h-12 w-[97px] shrink-0 items-center justify-center gap-2 rounded bg-[#F0B90B] px-4 py-3 text-[#2A2722] transition-opacity hover:opacity-90"
      >
        <span class="text-sm font-medium leading-[22px]">
          جستجو
        </span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            fill="none"
            class="h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
        >
          <circle
              cx="6.2"
              cy="6.2"
              r="4.4"
              stroke="#2A2722"
              stroke-width="1.3"
          />
          <path
              d="M9.6 9.6L12.4 12.4"
              stroke="#2A2722"
              stroke-width="1.3"
              stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-400">
      {{ error }}
    </p>
  </form>
</template>
