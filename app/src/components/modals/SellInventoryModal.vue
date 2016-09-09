<template>
<div class="ui small modal">
  <i class="close icon"></i>
  <div class="header">
    Sell Inventory - {{tracker.name}}
  </div>
  <div class="content">
    <div class="ui form">
      <div class="inline fields">
        <label>Stack size</label>
        <div class="field">
          <input type="number" placeholder="1" v-model="stack_size">
        </div>
      </div>

      <div class="inline fields">
        <label># of Stacks</label>
        <div class="field">
          <input type="number" placeholder="1" v-model="num_stacks">
        </div>
      </div>

      <div class="inline fields">
        <label>Bid</label>
        <div class="field">
          <input type="text" placeholder="Gold" v-model="bid_gold">
        </div>
        <div class="field">
          <input class="small-money-input" type="text" placeholder="Silver" v-model="bid_silver">
        </div>
        <div class="field">
          <input class="small-money-input" type="text" placeholder="Copper" v-model="bid_copper">
        </div>

        per item
      </div>

      <div class="inline fields">
        <label>Buyout</label>
        <div class="field">
          <input type="text" placeholder="Gold" v-model="buyout_gold">
        </div>
        <div class="field">
          <input class="small-money-input" type="text" placeholder="Silver" v-model="buyout_silver">
        </div>
        <div class="field">
          <input class="small-money-input" type="text" placeholder="Copper" v-model="buyout_copper">
        </div>

        per item
      </div>

      <h4 class="ui dividing header">Statistics</h4>

      <div class="ui segment inverted">
        <div class="inline">
          You Have: {{stock}}
        </div>
        <div class="inline">
          Currently lowest: <gold :amount="lowest"></gold>
        </div>
      </div>
    </div>
  </div>
  <div class="actions">
    <div class="ui left floated grey deny button">
      Cancel
    </div>
    <button type="submit" class="ui right green labeled icon button" @click="sell()">
      Sell
      <i class="cart icon"></i>
    </button>
  </div>
</div>
</template>

<style scoped>
input[type="text"]{
  width: 100px !important;
  text-align: right;
}

.small-money-input{
  width: 60px !important;
}
</style>

<script>
import $ from 'jquery'
import Gold from '../Gold'
import utils from '../../services/utils'
import api from '../../services/armory.api'
import toastr from 'toastr'
// import * as types from '../../vuex/mutation-types'

export default {
  props: ['index', 'lowest'],
  components: {
    Gold
  },
  data () {
    return {
      stack_size: 1,
      num_stacks: 1,
      bid_gold: null,
      bid_silver: null,
      bid_copper: null,
      buyout_gold: null,
      buyout_silver: null,
      buyout_copper: null
    }
  },
  computed: {
    tracker () {
      return this.tracked_items[this.index]
    },
    stock () {
      return this.inventory[this.tracker.id].quantity
    }
  },
  ready () {
  },
  methods: {
    open () {
      this.undercut()
      $(this.$el).modal('show')
    },
    close () {
      $(this.$el).modal('hide')
    },
    undercut () {
      if (this.lowest) {
        let undercut = utils.extractMoney(this.lowest - 1)

        this.bid_gold = undercut.gold
        this.bid_silver = undercut.silver
        this.bid_copper = undercut.copper

        this.buyout_gold = undercut.gold
        this.buyout_silver = undercut.silver
        this.buyout_copper = undercut.copper
      }
    },
    sell () {
      let submitAuction = (ticket, stacksLeft) => {
        api.createAuction({
          itemId: this.tracker.id,
          stack_size: this.stack_size,
          num_stacks: this.num_stacks,
          buyoutAmount: utils.getFullAmount({
            gold: this.buyout_gold,
            silver: this.buyout_silver,
            copper: this.buyout_copper
          }),
          bidAmount: utils.getFullAmount({
            gold: this.bid_gold,
            silver: this.bid_silver,
            copper: this.bid_copper
          }),
          ticket
        }).then(res => {
          if (stacksLeft === 1) {
            toastr.success('Auction Created!')
            this.close()
          } else {
            if (res.auction && res.auction.nextTicket) {
              submitAuction(res.auction.nextTicket, stacksLeft - 1)
            }
          }
        })
      }

      api.deposit({
        itemId: this.tracker.id,
        stack_size: this.stack_size,
        num_stacks: this.num_stacks
      }).then((res) => {
        let ticket = res.ticket

        submitAuction(ticket, parseInt(this.num_stacks))
      })
    }
  },
  vuex: {
    getters: {
      tracked_items: state => state.tracker.tracked_items,
      inventory: state => state.profile.inventory
    },
    actions: {
    }
  }
}
</script>
