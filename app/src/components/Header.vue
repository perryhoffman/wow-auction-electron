<template>
  <div class="ui small borderless menu menu--header">
    <div class="ui container">
      <div class="header item">
        <img src="../assets/logo.png">
      </div>
      <div class="ui secondary pointing left menu">
        <a class="item" :class="{'active' : active_tab === 'tracker' }" @click="changeTab('tracker')">
          Tracker
          <div class="ui small teal label">{{tracked_items.length}}</div>
        </a>
        <!--<a class="item" @click="changeTab('inventory')">
        Inventory
          <div class="ui small teal label">0</div>
        </a>-->
        <a class="item" :class="{'active' : active_tab == 'history' }" @click="changeTab('history')">
          History
          <div class="ui small red label" v-if="unread > 0">{{unread}}</div>
        </a>
        <a class="item" :class="{'active' : active_tab === 'auctions' }" @click="changeTab('auctions')">
          Auctions
        </a>
      </div>
      <div class="right menu">
        <div class="item">
          
          <div class="ui labeled button" tabindex="0" @click="toggleAutobuy()">
            <div class="ui orange button">Auto Buy</div>
            <a class="ui basic left pointing label">{{autobuy ? 'ON' : 'OFF' }}</a>
          </div>

          <!--<div class="ui purple button">Inventory</div>

          <div class="ui labeled button" tabindex="0">
            <div class="ui primary button small">Auction</div>
            <a class="ui basic left pointing label">
            0
            </a>
          </div>

          <div class="ui labeled button" tabindex="0">
            <div class="ui teal button small">History</div>
            <a class="ui basic left pointing label">
            0
            </a>
          </div>-->
          <div class="ui primary button" v-on:click="openAddItemModal()">Track an Item</div>
        </div>
      </div>
    </div>
  </div>
  <add-item-modal v-ref:addItemModal></add-item-modal>
</template>

<style scoped>
.ui.menu--header .item img.logo {
    margin-right: 1em;
}

.ui.menu--header .item .button+ .button {
    margin-left: 1em;
}
</style>

<script>
import * as types from '../vuex/mutation-types'
import AddItemModal from './modals/AddItemModal'
import api from '../services/armory.api'

export default {
  ready () {
    this.checkInventory()
    this.inventoryInverval = setInterval(this.checkInventory, 5000)

    this.checkAuctions()
    this.auctionsInventory = setInterval(this.checkAuctions, 5000)
  },
  beforeDestroy () {
    clearInterval(this.inventoryInverval)
    clearInterval(this.auctionsInventory)
  },
  methods: {
    openAddItemModal () {
      this.$refs.additemmodal.open()
    },
    checkInventory () {
      api.get_inventory().then(inventory => {
        this.getInventory(inventory)
      })
    },
    checkAuctions () {
      api.get_auctions().then(auctions => {
        this.setAuctions(auctions)
      })
    }
  },
  components: {
    AddItemModal
  },
  vuex: {
    getters: {
      tracked_items: (store) => store.tracker.tracked_items,
      active_tab: state => state.tabs.active,
      won_history: state => state.history.won,
      autobuy: state => state.profile.autobuy,
      inventory: state => state.profile.inventory,
      unread: state => state.history.unread
    },
    actions: {
      changeTab (store, tab) {
        store.dispatch(types.TAB_CHANGE, tab)

        if (tab === 'history') {
          this.clearUnread()
        }
      },
      clearUnread (store) {
        store.dispatch(types.HISTORY_CLEAR_UNREAD)
      },
      toggleAutobuy (store) {
        store.dispatch(types.PROFILE_SET_AUTOBUY, !this.autobuy)
      },
      getInventory (store, inventory) {
        store.dispatch(types.PROFILE_SET_INVENTORY, inventory)
      },
      setAuctions (store, auc) {
        store.dispatch(types.AUCTIONS_SET, auc)
      }
    }
  }
}
</script>