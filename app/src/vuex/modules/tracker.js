import {
  TRACKER_ADD_ITEM
} from '../mutation-types'

const state = {
  tracked_items: []
}

const mutations = {
  [TRACKER_ADD_ITEM] (state, item) {
    state.tracked_items = state.tracked_items.concat([item])
  }
}

export default {
  state,
  mutations
}
