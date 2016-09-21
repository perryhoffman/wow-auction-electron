import storage from '../../services/storage'

import {
  AUCTIONS_SET
} from '../mutation-types'

const state = Object.assign({
  sold: [],
  ended: [],
  active: []
}, storage.get('app-state').auctions)

const mutations = {
  [AUCTIONS_SET] (state, {sold, ended, active}) {
    state.sold = sold
    state.ended = ended
    state.active = active
  }
}

export default {
  state,
  mutations
}
