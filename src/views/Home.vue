<template>
  <Alert v-bind:item="alertProp" v-on:alert-data="alertData" />
  <div class="flex justify-end mt-2">
    <form class="w-1/3" v-on:submit.prevent="handleSearch">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          id="default-search"
          v-model="search"
          type="search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search pokemon name..."
          required
        />
        <button
          class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  </div>
  <div
    class="p-10 m-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4"
  >
    <CardLoader v-if="isLoading" />

    <ListCard
      v-for="(item, index) in pokemonResults"
      v-else
      v-bind:key="index"
      v-bind:item="item"
    />
  </div>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    v-on:click="handleFetchData"
  >
    Load More
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PokemonItem, IndexPokemon, AlertItem } from '../types/exercise'
import { fetchPokemon, fetchPokemons } from '../services/pokemon'
import ListCard from '../components/ListCard.vue'
import CardLoader from '../components/CardLoader.vue'
import Alert from '../components/Alert.vue'

// reactive data
const pokemonResults = ref<PokemonItem[]>([])
const isLoading = ref(false)
const offset = ref(0)
const search = ref('')
const pokemonItems = ref<IndexPokemon[]>([])

const alertProp = ref<AlertItem>({
  message: '',
  title: '',
  type: '',
  showAlert: false,
})

const alertData = (data: AlertItem) => {
  alertProp.value = data
}

// batch fetching individual pokemons
const mapData = async () => {
  const pokemonResponses = pokemonItems.value.map(
    async (item: IndexPokemon) => {
      const response = await fetchPokemon(item.name)
      return response.data
    },
  )
  pokemonResults.value = await Promise.all(pokemonResponses)
}

const handleFetchData = async () => {
  try {
    isLoading.value = true
    offset.value = pokemonItems.value.length ? (offset.value += 20) : 0
    const response = await fetchPokemons(offset.value)
    pokemonItems.value = [...pokemonItems.value, ...response.data.results]
    await mapData()
    isLoading.value = false
    alertProp.value = {
      showAlert: true,
      title: 'Success',
      type: 'success',
      message: 'Items retrived successfully',
    }
  } catch (error) {
    alertProp.value = {
      showAlert: true,
      title: 'Error',
      type: 'danger',
      message: 'Sorry items could not be retrieved try again later.',
    }
  }
}

const handleSearch = async () => {
  const canSearch = pokemonItems.value.some((data: IndexPokemon) =>
    data.name.includes(search.value),
  )

  if (canSearch && search.value) {
    pokemonItems.value = pokemonItems.value.filter((item: IndexPokemon) => {
      return item.name.includes(search.value)
    })
    await mapData()
  }
}

onMounted(async () => {
  await handleFetchData()
})
</script>
