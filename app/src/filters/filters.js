import Vue from 'vue'
import moment from 'moment'

Vue.filter('timeago', (unix) => {
  return moment.unix(unix).fromNow()
})
