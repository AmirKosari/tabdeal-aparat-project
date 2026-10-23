<script setup lang="ts">
const route = useRoute()
const showSearch = computed(() => route.path === '/')
</script>

<template>
  <div class="min-h-screen bg-[#2C2E30] text-white">
    <AppHeader :show-search="showSearch"/>
    <slot/>
  </div>
</template>
