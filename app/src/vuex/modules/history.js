import moment from 'moment'
import storage from '../../services/storage'

import {
  HISTORY_ADD
} from '../mutation-types'

const state = Object.assign({
  won: []
}, storage.get('app-state').history)

const mutations = {
  [HISTORY_ADD] (state, auction) {
    state.won = [{
      datetime: moment().unix(),
      ...auction
    }].concat(state.won)
  }
}

export default {
  state,
  mutations
}
