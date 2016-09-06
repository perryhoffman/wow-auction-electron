import storage from '../../services/storage'

import {
  PROFILE_SET_MONEY,
  PROFILE_SET_MONEY_EARNED,
  PROFILE_SET_CHARACTER,
  PROFILE_SET_CHARACTER_CHOICES
} from '../mutation-types'

const state = Object.assign({
  money: 0,
  money_earned: 0,
  character: {},
  character_choices: []
}, storage.get('app-state').profile)

const mutations = {
  [PROFILE_SET_MONEY] (state, amount) {
    state.money = amount
  },
  [PROFILE_SET_MONEY_EARNED] (state, amount) {
    state.money_earned = amount
  },
  [PROFILE_SET_CHARACTER] (state, character) {
    state.character = character
  },
  [PROFILE_SET_CHARACTER_CHOICES] (state, choices) {
    state.character_choices = choices
  }
}

export default {
  state,
  mutations
}
