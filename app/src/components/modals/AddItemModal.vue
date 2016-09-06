<template>
<div class="ui basic modal">
  <i class="close icon"></i>
  <div class="header">
    Track An Item
  </div>
  <div class="content">
    <div class="ui fluid search">
      <div class="ui fluid icon input">
        <input class="prompt" type="text" placeholder="eg. Spirit of War" v-model="search_term">
        <i class="search icon"></i>
      </div>
      <div class="results"></div>
    </div>
  </div>
</div>
</template>

<style scoped>
.ui.fluid.search{
  width: 100%;
}

.modal{
  margin-top: -25% !important;
}

.results{
  max-height: 300px;
  overflow-y: auto;
}
</style>

<script>
import $ from 'jquery'
// import itemsXHR from '../../services/items.db'
import items from '../../../static/master_auctionable_items.json'
import * as types from '../../vuex/mutation-types'

export default {
  ready () {
    $(this.$el).find('.ui.search').search({
      source: items,
      searchFields: ['name'],
      maxResults: 20,
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
  },
  methods: {
    open () {
      $(this.$el).modal('show')
      this.search_term = ''
    },
    close () {
      $(this.$el).modal('hide')
      this.search_term = ''
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
