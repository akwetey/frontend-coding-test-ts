<template>
  <Alert v-bind:item="alertProp" v-on:alert-data="alertData" />
  <Spinner v-if="isLoading" />
  <div v-else class="flex justify-center">
    <div
      class="bg-white px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:w-1/2 sm:w-full"
    >
      <div class="mx-auto max-w-4xl">
        <section class="border-gray-200">
          <div class="flex space-x-6 border-b border-gray-200 py-5">
            <img
              v-bind:src="results.sprites?.other?.dream_world.front_default!"
              v-bind:alt="results.name"
              class="p-4 h-20 w-20 rounded-lg bg-gray-100 sm:h-40 sm:w-40"
            />
            <div>
              <div class="flex flex-col items-start">
                <h4 class="text-4xl font-bold text-gray-900">
                  {{ results.name }}
                </h4>
                <li
                  v-for="(item, index) in results.abilities"
                  v-bind:key="index"
                >
                  {{ item.ability.name }}
                </li>
              </div>
              <div class="mt-6 flex flex-1 items-end">
                <di
                  class="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6"
                >
                  <div class="flex">
                    <p class="font-medium text-gray-900">Weight:</p>
                    <p class="ml-2 text-gray-700">{{ results.weight }}</p>
                  </div>
                  <div class="flex pl-4 sm:pl-6">
                    <p class="font-medium text-gray-900">Height:</p>
                    <p class="ml-2 text-gray-700">{{ results.height }}</p>
                  </div>
                </di>
              </div>
            </div>
          </div>

          <div class="sm:ml-40 sm:pl-6">
            <div class="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div
                v-for="(item, index) in results.stats"
                v-bind:key="index"
                class="flex justify-between"
              >
                <p class="font-medium text-gray-900 capitalize">
                  {{ item.stat.name }}
                </p>
                <p class="text-gray-700">{{ item.base_stat }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPokemon } from '../services/pokemon'
import { PokemonItem, AlertItem } from '../types/exercise'
import Spinner from '../components/Spinner.vue'
import Alert from '../components/Alert.vue'

const results = ref({} as PokemonItem)
const route = useRoute()
const isLoading = ref(false)
const alertProp = ref<AlertItem>({
  message: '',
  title: '',
  type: '',
  showAlert: false,
})

const alertData = (data: AlertItem) => {
  alertProp.value = data
}

onMounted(async () => {
  try {
    isLoading.value = true
    const id = route.params.id as string
    const response = await fetchPokemon(id)
    isLoading.value = false
    results.value = response.data
    alertProp.value = {
      showAlert: true,
      title: 'Success',
      type: 'success',
      message: 'Item retrived successfully',
    }
  } catch (error) {
    alertProp.value = {
      showAlert: true,
      title: 'Error',
      type: 'danger',
      message: 'Sorry item could not be retrieved try again later.',
    }
  }
})
</script>
