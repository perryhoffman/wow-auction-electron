import utils from './utils'
import $ from 'jquery'

export default {
  inventory (html) {
    let body = html.querySelectorAll('body')[0].innerHTML.replace(/<img[^>]*>/g, '')
    let table = $(body).find('#inventory-0')
    let results = {}

    table.find('tbody tr').each((index, elem) => {
      elem = $(elem)
      results[elem.find('.name a').data('id')] = {
        item_id: elem.find('.name a').data('id'),
        name: elem.find('.name a').text().trim(),
        quantity: elem.find('.quantity').text().trim()
      }
    })

    return {data: results}
  },
  auctions (html) {
    let body = html.querySelectorAll('body')[0].innerHTML.replace(/<img[^>]*>/g, '')
    html = $(body)

    let types = ['active', 'sold', 'ended']
    let result = {}

    for (let i in types) {
      let type = types[i]
      let table = html.find('#auctions-' + type + ' table')
      let results = []

      table.find('tbody tr').each(function (index, elem) {
        elem = $(elem)
        let data = {
          auc_id: elem.attr('id').replace('auction-', ''),
          item: elem.find('td.item a:eq(1)').text(),
          quantity: elem.find('td.quantity').text(),
          quality: elem.find('td.item a:eq(1)').attr('class'),
          icon: elem.find('td.item a:eq(0)').css('background-image')
        }

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

        if (type === 'active') {
          data = $.extend(data, {
            price_bid: utils.getFullAmount(
                    parseInt(bid.gold.text().replace(/,/g, '')),
                    parseInt(bid.silver.text()),
                    parseInt(bid.copper.text())
                  ),
            price_buyout: utils.getFullAmount(
                    parseInt(buyout.gold.text().replace(/,/g, '')),
                    parseInt(buyout.silver.text()),
                    parseInt(buyout.copper.text())
                  ),
            price_per: utils.getFullAmount(
                    parseInt(elem.find('td.price .price-tooltip .icon-gold:eq(1)').text().replace(/,/g, '')),
                    parseInt(elem.find('td.price .price-tooltip .icon-silver:eq(1)').text()),
                    parseInt(elem.find('td.price .price-tooltip .icon-copper:eq(1)').text())
                  ),
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
          })
        }

        if (type === 'sold') {
          let boughtPrice = parseInt(elem.find('td.price').data('raw'))

          data = $.extend(data, {
            item: elem.find('td.item a').text().trim(),
            quality: elem.find('td.item a').attr('class'),
            buyer: elem.find('td:eq(3) a').text(),
            bought_price: boughtPrice
          })
        }

        if (type === 'ended') {
          data.quality = elem.find('td.item a').attr('class')
          data.item = elem.find('td.item a').text().trim()
        }

        results.push(data)
      })

      result[type] = results
    }

    return {data: result}
  },
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
