import Vue from 'vue'
import store from './vuex/store'
import App from './App'
import 'semantic'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  store,
  components: { App }
})
