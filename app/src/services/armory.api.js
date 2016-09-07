import $ from 'jquery'
import scraper from './scraper'
import store from '../vuex/store'

const API_BASE_URL = 'https://us.battle.net/wow/en/vault/character/auction/'

const errorHandler = (res) => {
  if (!res) {
    throw new Error()
  }

  if (!res || res.error) {
    throw res.error
  }

  return res
}

export default {
  search_auction: (itemId) => {
    $.get(API_BASE_URL)

    return $.get({
      url: API_BASE_URL + 'browse',
      data: {
        itemId,
        reverse: false,
        sort: 'unitBuyout'
      }
    }).then((html, a, res) => {
      let scapedData = scraper.search_auction(html)
      return scapedData.data
    })
  },
  buyout: ({auc_id, price_buyout}) => {
    return $.ajax({
      url: API_BASE_URL + 'bid',
      method: 'POST',
      data: $.param({
        auc: auc_id,
        money: price_buyout,
        xstoken: store.state.authentication.xstoken
      })
    }).then(errorHandler)
  },
  logout: () => {
    return $.get('https://us.battle.net/wow/en/vault/character/auction/browse?logout')
  }
}
