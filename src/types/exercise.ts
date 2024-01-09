export interface ShowExercises {
  second: boolean
  third: boolean
}

export interface IndexPokemon {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Array<IndexPokemon>
}

export interface DreamWorld {
  front_default: string | null
  front_female: string | null
}

export interface Other {
  dream_world: DreamWorld
}

export interface Sprites {
  other?: Other
}
export interface Ability {
  name: string
  url: string
}

export interface AbilityItem {
  ability: Ability
  is_hidden: boolean
  slot: number
}

export interface Stat {
  name: string
  url: string
}
export interface StatsItem {
  base_stat: number
  effort: number
  stat: Stat
}

export interface PokemonItem {
  name: string
  height: number
  order: number
  base_experience: number
  weight: number
  sprites: Sprites
  abilities: Array<AbilityItem>
  stats: Array<StatsItem>
}


export interface AlertItem {
  title: string
  message: string
  type: string
  showAlert: boolean
}