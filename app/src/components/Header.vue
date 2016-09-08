<template>
  <div class="ui small borderless menu menu--header">
    <div class="ui container">
      <div class="ui secondary pointing left menu">
        <a class="item" :class="{'active' : active_tab === 'tracker' }" @click="changeTab('tracker')">
          Tracker
          <div class="ui small teal label">{{tracked_items.length}}</div>
        </a>
        <!--<a class="item" @click="changeTab('inventory')">
          Inventory
          <div class="ui small teal label">0</div>
        </a>
        <a class="item" @click="changeTab('auctions')">
          Auctions
          <div class="ui small teal label">0</div>
        </a>-->
        <a class="item" :class="{'active' : active_tab == 'history' }" @click="changeTab('history')">
          History
          <div class="ui small teal label">{{won_history.length}}</div>
        </a>
      </div>
      <div class="right menu">
        <div class="item">
          <div class="ui orange button">Auto Buy</div>

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
    margin-right: 1.5em;
}

.ui.menu--header .item .button+ .button {
    margin-left: 1em;
}
</style>

<script>
import * as types from '../vuex/mutation-types'
import AddItemModal from './modals/AddItemModal'

export default {
  ready () {
  },
  methods: {
    openAddItemModal () {
      this.$refs.additemmodal.open()
    }
  },
  components: {
    AddItemModal
  },
  vuex: {
    getters: {
      tracked_items: (store) => store.tracker.tracked_items,
      active_tab: state => state.tabs.active,
      won_history: state => state.history.won
    },
    actions: {
      changeTab (store, tab) {
        store.dispatch(types.TAB_CHANGE, tab)
      }
    }
  }
}
</script>