<template>
  <div id="app">
    <header-component></header-component>
    <div class="items-container content" v-show="active_tab === 'tracker'">
      <div class="ui stackable three column grid">
        <item-card v-for="(index, item) in tracked_items" :item="item" :index="index"></item-card>
      </div>
    </div>
    <div class="items-container history-container content" v-if="active_tab === 'history'">
      <div class="ui segment" v-for="won in won_history">
        <div class="ui feed">
          <div class="event">
            <div class="content">
              <div class="date">
                {{won.datetime|timeago}}
              </div>
              <div class="summary">
                You <span v-if="!won.autobuy">bought</span><a v-if="won.autobuy" class="autobought">Auto Bought</a> {{won.quantity}} x <a>{{won.item}}</a> for <gold class="padded" :amount="won.price_buyout"></gold> each.
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
      won_history: state => state.history.won
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
