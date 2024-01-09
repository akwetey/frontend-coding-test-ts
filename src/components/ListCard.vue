<template>
  <Router-link
    v-bind:to="{
      name: 'Details',
      params: { id: props.item.name },
    }"
  >
    <div class="rounded overflow-hidden shadow-lg">
      <img
        class="w-[100px] h-[100px] m-auto"
        v-bind:src="props.item.sprites.other?.dream_world.front_default!"
        v-bind:alt="props.item.name"
      />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ props.item.name }}</div>
        <p class="text-gray-700 text-base">#{{ props.item.order }}</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >{{ props.item.weight }}</span
        >
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >{{ props.item.height }}</span
        >
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >{{ props.item.base_experience }}</span
        >
      </div>
    </div></Router-link
  >
</template>

<script setup lang="ts">
import { PokemonItem } from '../types/exercise'

const props = defineProps<{
  item: PokemonItem
}>()
</script>
