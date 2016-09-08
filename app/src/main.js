import Vue from 'vue'
import store from './vuex/store'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  store,
  components: { App },
  ready () {
  }
})
