<template>
<div class="ui basic modal">
  <i class="close icon"></i>
  <div class="header">
    Track An Item
  </div>
  <div class="content">
    <div class="ui fluid search">
      <div class="ui fluid icon input">
        <input class="prompt" type="text" placeholder="eg. Spirit of War">
        <i class="search icon"></i>
      </div>
      <div class="results"></div>
    </div>
  </div>
</div>
</template>

<style>
.ui.fluid.search{
  width: 100%;
}
</style>

<script>
import $ from 'jquery'
import itemsXHR from '../../services/items.db'
import * as types from '../../vuex/mutation-types'

export default {
  ready () {
    itemsXHR.then(items => {
      $(this.$el).find('.ui.search').search({
        source: items,
        searchFields: ['name'],
        minCharacters: 3,
        fields: {
          title: 'name'
        },
        searchFullText: true,
        onSelect: (result) => {
          this.addTrackItem(result)
          this.close()
        }
      })
    })
  },
  methods: {
    open () {
      $(this.$el).modal('show')
    },
    close () {
      $(this.$el).modal('hide')
    }
  },
  vuex: {
    actions: {
      addTrackItem (store, item) {
        store.dispatch(types.TRACKER_ADD_ITEM, item)
      }
    }
  }
}
</script>
