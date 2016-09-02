<template>
  <div id="app">
    <header-component></header-component>
    <div class="items-container content">
      <div class="ui stackable four column grid">
        <item-card v-for="item in items"></item-card>
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
  data () {
    return {
      items: [1, 2, 3, 4]
    }
  },
  components: {
    HeaderComponent,
    FooterComponent,
    ItemCard
  }
}
</script>

<style>
@import '../node_modules/semantic-ui/dist/semantic.css';

.items-container{
  padding: 25px;
}
</style>
