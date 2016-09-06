<template>
  <div id="app">
    <header-component></header-component>
    <div class="items-container content">
      <div class="ui stackable four column grid">
        <item-card v-for="(index, item) in tracked_items" :item="item" :index="index"></item-card>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import '../node_modules/jquery/dist/jquery.js'
import '../node_modules/semantic-ui/dist/semantic.js'
import HeaderComponent from './components/Header'
import FooterComponent from './components/Footer'
import ItemCard from './components/ItemCard'

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    ItemCard
  },
  vuex: {
    getters: {
      tracked_items: state => state.tracker.tracked_items
    }
  }
}
</script>

<style>
@import '../node_modules/semantic-ui/dist/semantic.css';

.items-container{
  padding: 25px;
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
