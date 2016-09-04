import Vue from 'vue'
import Vuex from 'vuex'

import profile from './modules/profile'
import authentication from './modules/authentication'
import tracker from './modules/tracker'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    profile,
    tracker
  }
})
