import storage from '../../services/storage'

import {
  ADD_AUTOSELL_ITEM,
  REMOVE_AUTOSELL_ITEM
} from '../mutation-types'

const state = Object.assign({
  items: []
}, storage.get('app-state').autosell)

const mutations = {
  [ADD_AUTOSELL_ITEM] (state, item) {
    state.items = [item].concat(state.items)
  },
  [REMOVE_AUTOSELL_ITEM] (state, item) {
    state.items = [].concat(state.items.filter(existingItem => existingItem.id !== item.id))
  }
}

export default {
  state,
  mutations
}
