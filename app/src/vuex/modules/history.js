import moment from 'moment'
import storage from '../../services/storage'

import {
  HISTORY_ADD,
  HISTORY_CLEAR,
  HISTORY_LOST_ADD,
  HISTORY_INCR_UNREAD,
  HISTORY_CLEAR_UNREAD
} from '../mutation-types'

const state = Object.assign({
  won: [],
  lost: [],
  unread: 0
}, storage.get('app-state').history)

const mutations = {
  [HISTORY_ADD] (state, auction) {
    state.won = [{
      datetime: moment().unix(),
      ...auction
    }].concat(state.won)

    state.unread = state.unread + 1
  },
  [HISTORY_LOST_ADD] (state, auction) {
    state.lost = [{
      datetime: moment().unix(),
      ...auction
    }].concat(state.lost)
  },
  [HISTORY_CLEAR] (state) {
    state.won = []
    state.lost = []
    state.unread = 0
  },
  [HISTORY_INCR_UNREAD] (state) {
    state.unread = state.unread + 1
  },
  [HISTORY_CLEAR_UNREAD] (state) {
    state.unread = 0
  }
}

export default {
  state,
  mutations
}
