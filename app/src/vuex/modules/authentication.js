import {
  AUTH_SET_IS_LOGGED_IN,
  AUTH_SET_XSTOKEN
} from '../mutation-types'

const state = {
  is_logged_in: false,
  xstoken: null
}

const mutations = {
  [AUTH_SET_IS_LOGGED_IN] (state, bool) {
    state.is_logged_in = bool
  },
  [AUTH_SET_XSTOKEN] (state, token) {
    state.xstoken = token
  }
}

export default {
  state,
  mutations
}
