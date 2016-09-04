<template>
<div class="column">
  <div class="ui top attached menu">
    <div class="header borderless item">
      <h5 class="ui header left floated">
      {{item.name}}
      <div class="sub header">You Have: {{item.quantity || 0}}</div>
      </h5>
    </div>
  <div class="ui top pointing dropdown icon item right">
    <i class="setting icon"></i>
      <div class="menu">
        <div class="item">Comfortable</div>
        <div class="item">Cozy</div>
      </div>
    </div>
  </div>
  <div class="ui bottom attached segment">

  </div>
</div>
</template>

<script>
import $ from 'jquery'
import '../services/armory.api'

export default {
  props: ['item'],
  ready () {
    $(this.$el).find('.dropdown').dropdown()
  }
}
</script>

<style scoped>
.card .ui.header{
    margin-bottom:0;
}
</style>