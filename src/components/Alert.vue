<template>
  <div
    v-if="props.item.showAlert"
    v-bind:class="{
      'alert-danger': props.item.type?.toLocaleLowerCase() === 'danger',
      'alert-success': props.item.type?.toLocaleLowerCase() === 'success',
    }"
    role="alert"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <svg
          class="fill-current h-6 w-6 mr-4"
          v-bind:class="{
            'text-red-500': props.item.type?.toLocaleLowerCase() === 'danger',
            'text-teal-500': props.item.type?.toLocaleLowerCase() === 'success',
          }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
          />
        </svg>
        <div class="flex flex-col items-start">
          <h4 class="font-bold">{{ props.item.title }}</h4>
          <p class="text-sm">{{ props.item.message }}</p>
        </div>
      </div>
      <span v-on:click="hideAlert">
        <svg
          class="fill-current h-6 w-6"
          v-bind:class="{
            'text-red-500': props.item.type?.toLocaleLowerCase() === 'danger',
            'text-teal-500': props.item.type?.toLocaleLowerCase() === 'success',
          }"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AlertItem } from '../types/exercise'

const props = defineProps<{
  item: AlertItem
}>()

const alertProp = ref<AlertItem>({
  message: '',
  title: '',
  type: '',
  showAlert: false,
})

const emit = defineEmits(['alertData'])

const hideAlert = () => {
  emit('alertData', alertProp.value)
}
</script>
