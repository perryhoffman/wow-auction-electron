<template>
  <div id="app" style="padding-bottom: 100px">
    <header-component></header-component>
    <div class="items-container content" v-show="active_tab === 'tracker'">
      <div class="ui stackable three column grid">
        <item-card v-for="(index, item) in tracked_items" :item="item" :index="index"></item-card>
      </div>
    </div>
    <div class="items-container history-container content" v-if="active_tab === 'history'">
      <div class="ui button" @click="clearHistory()">Clear History</div>
      <h5>WON - {{won_history.length}}</h5>
      <div class="ui segment auction-container">
        <div class="ui feed" v-for="won in won_history">
          <div class="event">
            <div class="content">
              <div class="summary">
                {{won.datetime|timeago}} - You <span v-if="!won.autobuy">bought</span><a v-if="won.autobuy" class="autobought">Auto Bought</a> {{won.quantity}} x <a>{{won.item}}</a> for <gold class="padded" :amount="won.price_per"></gold> each for a total of <gold class="padded" :amount="won.price_buyout"></gold>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5>MISSED - {{lost_history.length}}</h5>
      <div class="ui segment auction-container">
        <div class="ui feed" v-for="won in lost_history">
          <div class="event">
            <div class="content">
              <div class="summary">
                {{won.datetime|timeago}} - You <a class="autobought">missed</a> {{won.quantity}} x <a>{{won.item}}</a> for <gold class="padded" :amount="won.price_per"></gold> each for a total of <gold class="padded" :amount="won.price_buyout"></gold>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="items-container history-container content" v-if="active_tab === 'auctions'">
      <h5>SOLD - {{auctions.sold.length}}</h5>
      <div class="ui segment auction-container">
        <div class="ui feed" v-for="won in auctions.sold">
          <div class="event">
            <div class="content">
              <div class="summary">
                You <a>sold</a> {{won.quantity}} x <a>{{won.item}}</a> for <gold class="padded" :amount="won.bought_price"></gold> at <gold class="padded" :amount="won.bought_price/won.quantity"></gold> each
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5>ACTIVE - {{auctions.active.length}}</h5>
      <div class="ui segment auction-container">
        <div class="ui feed" v-for="won in auctions.active">
          <div class="event">
            <div class="content">
              <div class="summary">
                You <a>active</a> {{won.quantity}} x <a>{{won.item}}</a> for <gold class="padded" :amount="won.bought_price"></gold> at <gold class="padded" :amount="won.bought_price/won.quantity"></gold> each
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import '../node_modules/jquery/dist/jquery.js'
import '../node_modules/semantic-ui-css/semantic.js'
import * as types from './vuex/mutation-types'
import HeaderComponent from './components/Header'
import FooterComponent from './components/Footer'
import ItemCard from './components/ItemCard'
import Gold from './components/Gold'

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    ItemCard,
    Gold
  },
  vuex: {
    getters: {
      tracked_items: state => state.tracker.tracked_items,
      active_tab: state => state.tabs.active,
      won_history: state => state.history.won,
      lost_history: state => state.history.lost,
      auctions: state => state.auctions
    },
    actions: {
      clearHistory (store) {
        store.dispatch(types.HISTORY_CLEAR)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../node_modules/semantic-ui-css/semantic.css';
@import '../node_modules/toastr/build/toastr.css';

.items-container{
  padding: 25px;
}

.auction-container{
  max-height: 300px;
  overflow-y: auto;
}

.history-container{
  .segment{
    background:lighten(#1B1C1D, 10);
  }
  .summary, .date{
    color:#fff !important;
  }

  a{
    color:#9c0 !important;
  }

  .autobought{
    color:orange !important;
  }
}

::-webkit-scrollbar {
    height: 5px;
    width: 5px;
    background: rgba(255,255,255,0.5);
}

::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.5);
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-corner {
    background: #bbb;
}
</style>
