import storage from '../../services/storage'

import {
  TRACKER_ADD_ITEM,
  TRACKER_REMOVE_ITEM
} from '../mutation-types'

const state = Object.assign({
  tracked_items: []
}, storage.get('app-state').tracker)

const mutations = {
  [TRACKER_ADD_ITEM] (state, item) {
    state.tracked_items = state.tracked_items.concat([item])
  },
  [TRACKER_REMOVE_ITEM] (state, index) {
    state.tracked_items = [...state.tracked_items.slice(0, index), ...state.tracked_items.slice(index + 1)]
  }
}

export default {
  state,
  mutations
}
