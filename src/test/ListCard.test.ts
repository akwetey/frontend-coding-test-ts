/* eslint-disable import/no-extraneous-dependencies */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ListCard from '../components/ListCard.vue'
import { PokemonItem } from '../types/exercise'

describe('ListCard.vue', () => {
  const pokemonItem: PokemonItem = {
    name: 'john',
    order: 2,
    weight: 20,
    height: 40,
    base_experience: 40,
    sprites: {},
    abilities: [],
    stats: [],
  }
  const wrapper = mount(ListCard, {
    propsData: {
      item: pokemonItem,
    },
  })
  it('checks the prop values', () => {
    expect(wrapper.props().item).toEqual(pokemonItem)
  })
})
