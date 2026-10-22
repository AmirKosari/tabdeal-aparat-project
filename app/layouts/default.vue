<script setup lang="ts">
const route = useRoute()
const showSearch = computed(() => route.path === '/')
</script>

<template>
  <div class="min-h-screen bg-surface text-white">
    <AppHeader :show-search="showSearch"/>
    <slot/>
  </div>
</template>
