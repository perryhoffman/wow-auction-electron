import utils from './utils'
import $ from 'jquery'

export default {
  search_auction (html) {
    let body = html.querySelectorAll('body')[0].innerHTML.replace(/<img[^>]*>/g, '')
    let table = $(body).find('.auction-house table')
    let results = []

    let xstoken = body.match(/var xsToken = '(.*)';/)[1]

    table.find('tbody tr').each(function (index, elem) {
      elem = $(elem)

      let buyout = {
        gold: elem.find('td.price .price-buyout .icon-gold'),
        silver: elem.find('td.price .price-buyout .icon-silver'),
        copper: elem.find('td.price .price-buyout .icon-copper')
      }

      let bid = {
        gold: elem.find('td.price .price-bid .icon-gold'),
        silver: elem.find('td.price .price-bid .icon-silver'),
        copper: elem.find('td.price .price-bid .icon-copper')
      }

      let data = {
        auc_id: elem.attr('id').replace('auction-', ''),
        item: elem.find('td.item a:eq(1)').text(),
        seller: elem.find('td.item a:eq(2)').text(),
        quantity: elem.find('td.quantity').text(),
        quality: elem.find('td.item a:eq(1)').attr('class'),
        price_bid: utils.getFullAmount({
          gold: parseInt(bid.gold.text().replace(/,/g, '')),
          silver: parseInt(bid.silver.text()),
          copper: parseInt(bid.copper.text())
        }),
        price_buyout: utils.getFullAmount({
          gold: parseInt(buyout.gold.text().replace(/,/g, '')),
          silver: parseInt(buyout.silver.text()),
          copper: parseInt(buyout.copper.text())
        }),
        price_per: utils.getFullAmount({
          gold: parseInt(elem.find('td.price .price-tooltip .icon-gold:eq(1)').text().replace(/,/g, '')),
          silver: parseInt(elem.find('td.price .price-tooltip .icon-silver:eq(1)').text()),
          copper: parseInt(elem.find('td.price .price-tooltip .icon-copper:eq(1)').text())
        }),
        price_bid_format: {
          gold: parseInt(bid.gold.text().replace(/,/g, '')) || '--',
          silver: parseInt(bid.silver.text()) || '--',
          copper: parseInt(bid.copper.text()) || '--'
        },

        price_buyout_format: {
          gold: parseInt(buyout.gold.text().replace(/,/g, '')) || '--',
          silver: parseInt(buyout.silver.text()) || '--',
          copper: parseInt(buyout.copper.text()) || '--'
        },
        price_buyout_per: {
          gold: parseInt(elem.find('td.price .price-tooltip .icon-gold:eq(1)').text().replace(/,/g, '')) || '--',
          silver: parseInt(elem.find('td.price .price-tooltip .icon-silver:eq(1)').text()) || '--',
          copper: parseInt(elem.find('td.price .price-tooltip .icon-copper:eq(1)').text()) || '--'
        }
      }

      results.push(data)
    })

    return {
      data: results,
      xstoken
    }
  }
}
