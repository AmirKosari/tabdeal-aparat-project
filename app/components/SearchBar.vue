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
          class="flex h-12 w-[97px] shrink-0 items-center justify-center gap-2 rounded bg-brand-yellow px-4 py-3 text-[#2A2722] transition-opacity hover:opacity-90"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M6.70841 12.6876C3.41258 12.6876 0.729248 10.0042 0.729248 6.70841C0.729248 3.41258 3.41258 0.729248 6.70841 0.729248C10.0042 0.729248 12.6876 3.41258 12.6876 6.70841C12.6876 10.0042 10.0042 12.6876 6.70841 12.6876ZM6.70841 1.60425C3.89091 1.60425 1.60425 3.89675 1.60425 6.70841C1.60425 9.52008 3.89091 11.8126 6.70841 11.8126C9.52591 11.8126 11.8126 9.52008 11.8126 6.70841C11.8126 3.89675 9.52591 1.60425 6.70841 1.60425Z"
              fill="#2A2722"/>
          <path
              d="M12.8334 13.2709C12.7226 13.2709 12.6118 13.2301 12.5243 13.1426L11.3576 11.9759C11.1884 11.8068 11.1884 11.5268 11.3576 11.3576C11.5268 11.1884 11.8068 11.1884 11.9759 11.3576L13.1426 12.5243C13.3118 12.6934 13.3118 12.9734 13.1426 13.1426C13.0551 13.2301 12.9443 13.2709 12.8334 13.2709Z"
              fill="#2A2722"/>
        </svg>
        <span class="text-sm font-medium">
          جستجو
        </span>
      </button>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-400">
      {{ error }}
    </p>
  </form>
</template>
