import storage from '../../services/storage'

import {
  TAB_CHANGE
} from '../mutation-types'

const state = Object.assign({
  active: 'tracker'
}, storage.get('app-state').tabs)

const mutations = {
  [TAB_CHANGE] (state, tab) {
    state.active = tab
  }
}

export default {
  state,
  mutations
}
