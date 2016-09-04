
import $ from 'jquery'

let CacheXHR = $.get('/static/master_auctionable_items.json').then((items) => {
  return items
})

export default CacheXHR
