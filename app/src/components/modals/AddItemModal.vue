<template>
<div class="ui basic modal">
  <i class="close icon"></i>
  <div class="header">
    Track An Item
  </div>
  <div class="content">
    <form class="ui inverted form">
      <div class="field">
        <input type="text" placeholder="eg. Spirit of War">
      </div>
    </form>
  </div>
  <div class="actions">
    <div class="ui ok green basic inverted button">
      <i class="checkmark icon"></i>
      Submit
    </div>

  </div>
</div>
</template>

<style>

</style>

<script>
import $ from 'jquery'

export default {
  methods: {
    open () {
      $(this.$el).modal('show')
    }
  }
}
</script>
