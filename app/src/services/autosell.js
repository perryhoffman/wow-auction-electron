import utils from './utils'
import api from './armory.api'
import store from '../vuex/store'
import toastr from 'toastr'

export default class AutoSell {
  constructor (options = {}) {
    let _defaultOptions = {
      interval: 15000
    }
    this.options = Object.assign({}, _defaultOptions, options)
    this.interval = null
    this.itemsToSell = []

    console.log('autosell items ', store.state.autosell.items)
    this.startInterval()
  }

  startInterval () {
    this.interval = setInterval(() => {
      this.checkInventory()
    }, this.options.interval)
  }

  clearInterval () {
    clearInterval(this.interval)
  }

  calculateStackNum (availableQty, stackSize) {
    let numStacks = Math.floor(availableQty / stackSize)

    return numStacks
  }

  getLowest (itemId) {
    let lowest = 0

    store.state.tracker.tracked_items.forEach(trackedItem => {
      if (itemId === trackedItem.id) {
        lowest = trackedItem.lowest_price_per
      }
    })

    return lowest
  }

  getAmountObj (item) {
    return {
      gold: item.gold,
      silver: item.silver,
      copper: item.copper
    }
  }

  checkInventory () {
    let items = [].concat(store.state.autosell.items)
    let inventory = Object.assign({}, store.state.profile.inventory)

    items.forEach(item => {
      let inventoryItem = inventory[item.id]

      if (inventoryItem && inventoryItem.quantity && parseInt(inventoryItem.quantity) > parseInt(item.min_qty)) {
        item.available_qty = parseInt(inventoryItem.quantity) - parseInt(item.min_qty)
        this.itemsToSell.push(item)
      }
    })

    if (this.itemsToSell.length) {
      this.itemsToSell.forEach(item => {
        let numStacks = this.calculateStackNum(item.available_qty, item.stack_size)
        let lowest = this.getLowest(item.id)
        let undercut = utils.extractMoney(lowest - 1)
        if (lowest > 0) {
          this.submitAuction(item.id, item.stack_size, numStacks, undercut)
        }
      })

      this.itemsToSell = []
    }

    // let undercut = utils.extractMoney(this.lowest - 1)
    //
    // this.bid_gold = undercut.gold
    // this.bid_silver = undercut.silver
    // this.bid_copper = undercut.copper
    //
    // this.buyout_gold = undercut.gold
    // this.buyout_silver = undercut.silver
    // this.buyout_copper = undercut.copper
  }

  submitAuction (itemId, stackSize = 1, numStacks = 1, undercut = {}) {
    let createAuction = (ticket, stacksLeft) => {
      api.createAuction({
        itemId: itemId,
        stack_size: stackSize,
        num_stacks: numStacks,
        buyoutAmount: utils.getFullAmount(undercut),
        bidAmount: utils.getFullAmount(undercut),
        ticket
      }).then(res => {
        if (stacksLeft === 1) {
          toastr.success('Auto Selling')
        } else {
          if (res.auction && res.auction.nextTicket) {
            createAuction(res.auction.nextTicket, stacksLeft - 1)
          }
        }
      })
    }

    api.deposit({
      itemId: itemId,
      stack_size: stackSize,
      num_stacks: numStacks
    }).then((res) => {
      let ticket = res.ticket

      console.log('TICKET ', ticket)
      createAuction(ticket, parseInt(numStacks))
    })
  }
}
