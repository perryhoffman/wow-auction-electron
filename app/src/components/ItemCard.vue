<template>
<div class="column">
  <div class="ui top attached menu inverted card-header">
    <div class="header borderless item">
      <h5 class="ui header inverted left floated">
        {{item.name}}
        <div class="sub header inventory-qty">You Have: {{item.quantity || 0}}</div>
      </h5>
    </div>
    <div class="ui top pointing dropdown icon item right">
      <i class="setting icon inverted"></i>
      <div class="menu">
        <div class="item">Manage Autobuy</div>
        <div class="divider"></div>
        <div class="item" @click="removeItem(index)">Remove Item</div>
      </div>
    </div>
  </div>
  <div class="ui attached listing-container">
    <div class="ui listing" @contextmenu="buyOutItem(auction)" v-for="auction in auctions" track-by="auc_id">
      <div class="ui two column grid">
        <div class="column">
          <div class="item">{{auction.quantity}} x {{auction.item}}</div>
          <div class="seller">{{auction.seller}}</div>
          <div class="buy-text">Right Click to Buy</div>
        </div>
        <div class="column right aligned">
          <div><gold class="no-icon" :amount="auction.price_buyout"></gold></div>
          <div><gold class="no-icon" :amount="auction.price_per"></gold></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import * as types from '../vuex/mutation-types'
import $ from 'jquery'
import Gold from './Gold'
import api from '../services/armory.api'

export default {
  components: {
    Gold
  },
  data () {
    return {
      auctions: []
    }
  },
  props: ['item', 'index'],
  beforeDestroy () {
    clearInterval(this.listingInterval)
  },
  ready () {
    $(this.$el).find('.dropdown').dropdown()

    this.updateListing()
    this.listingInterval = setInterval(this.updateListing, 5000)
  },
  vuex: {
    getters: {
      xstoken: state => state.authentication.xstoken
    },
    actions: {
      removeItem (store, index) {
        store.dispatch(types.TRACKER_REMOVE_ITEM, index)
      }
    }
  },
  methods: {
    updateListing () {
      api.search_auction(this.item.id)
        .then((auctions) => {
          this.auctions = auctions
        })
    },
    buyOutItem (auction) {
      api.buyout(auction)
    }
  }
}
</script>

<style lang="scss" scoped>
.card .ui.header{
  margin-bottom:0;
}

.card-header{
  margin:0 !important;
  width: 100% !important;
}

.inventory-qty{
  font-size: 11px !important;
}

.listing-container{
  max-height: 400px;
  border:none;
  overflow-x: hidden;
  overflow-y: auto;

  border-top:1px solid #444;
  background: #2b1507;
}

.listing{
  color:#fff;
  padding: 5px 10px;

  cursor: url(/static/gam374.cur), default;
}

.listing + .listing{
  border-top: 1px solid #30190b;
}

.listing:nth-child(2n){
  background:#231207;
}

.listing:hover{
  background:#180c04;
}

.listing:hover .seller{
  display:none;
}

.buy-text{
  display:none;
}

.listing:hover .buy-text{
  display:block;
}

.item{
  font-size:11px;
  font-weight: bold;
}

.seller, .buy-text{
  color:#ffb100;
  font-size: 11px;
}

.buy-text{
  color:#1eff00;
}
</style>