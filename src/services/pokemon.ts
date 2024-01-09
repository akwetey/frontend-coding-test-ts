import { PokemonListResponse, PokemonItem } from '../types/exercise'
import httpClient from './httpClient'

const POKEMON_BASE_API_URL = 'https://pokeapi.co/api/v2'

const fetchPokemons = async (offset: number) => {
  const results = await httpClient.get<PokemonListResponse>(
    `${POKEMON_BASE_API_URL}/pokemon?offset=${offset}&limit=20`,
  )
  return results
}

const fetchPokemon = async (name: string) => {
  const results = await httpClient.get<PokemonItem>(
    `${POKEMON_BASE_API_URL}/pokemon/${name}`,
  )
  return results
}

export { fetchPokemons, fetchPokemon }
