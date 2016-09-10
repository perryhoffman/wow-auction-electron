import Vue from 'vue'
import Vuex from 'vuex'

import profile from './modules/profile'
import authentication from './modules/authentication'
import tracker from './modules/tracker'
import history from './modules/history'
import tabs from './modules/tabs'
import auctions from './modules/auctions'
import storage from '../services/storage'
// import * as types from './mutation-types'

Vue.use(Vuex)

const saveStatePlugin = store => {
  store.subscribe((mutation, state) => {
    // if (mutation.type === types.TRACKER_ADD_ITEM) {
    storage.set('app-state', state)
    // }
  })
}

export default new Vuex.Store({
  modules: {
    auctions,
    authentication,
    profile,
    tracker,
    history,
    tabs
  },
  plugins: [saveStatePlugin]
})
