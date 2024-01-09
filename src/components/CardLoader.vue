<template>
  <div
    v-for="(item, index) in 12"
    v-bind:key="index"
    class="p-4 space-y-4 animate-pulse"
  >
    <div class="w-full h-32 bg-gray-200 rounded"></div>
    <div class="space-y-2">
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
</template>
