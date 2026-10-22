<script setup lang="ts">
withDefaults(defineProps<{ showSearch?: boolean }>(), {
  showSearch: true
})
</script>

<template>
  <header
      class="relative isolate overflow-hidden"
      :class="showSearch ? 'bg-[linear-gradient(90deg,#2C2E30_-0.76%,#0E0E0E_50%)]' : 'bg-[#2C2E30]'"
  >
    <div
        v-if="showSearch"
        class="pointer-events-none absolute start-[356px] top-[43px] z-[1] h-[152px] w-[200px] rounded-full bg-[#F0B90B] blur-[80px]"
        aria-hidden="true"
    />
    <div class="relative z-[4] mx-auto w-full max-w-[1920px]">
      <div class="absolute inset-x-0 top-0 z-[5] flex h-[72px] items-center justify-start px-4 md:px-[120px]">
        <AppLogo/>
      </div>
      <template v-if="showSearch">
        <div class="px-4 pb-6 pt-[88px] md:px-[120px] md:pb-6">
          <div class="mx-auto w-full max-w-[1680px]">
            <SearchBar/>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="h-[72px]"/>
      </template>
    </div>
  </header>
</template>
