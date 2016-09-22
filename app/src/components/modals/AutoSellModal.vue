<template>
<div class="ui small modal">
  <i class="close icon"></i>
  <div class="header">
    Auto Sell - {{tracker.name}}
  </div>
  <div class="content">
    <div class="ui form">

        <div class="inline fields">
          <label>Minimum Quantity Balance</label>
          <div class="field">
            <input type="number" placeholder="1" v-model="min_qty">
          </div>

          <i>Will automatically sell anything over this quantity</i>
        </div>

        <div class="inline fields">
            <label>Ideal Stack size</label>
            <div class="field">
              <input type="number" placeholder="1" v-model="stack_size">
            </div>
        </div>

      <h4 class="ui dividing header">Statistics</h4>

      <div class="ui segment inverted">
        <div class="inline">
          You Have: {{stock}}
        </div>
      </div>
    </div>
  </div>
  <div class="actions">
    <div class="ui left floated grey deny button">
      Cancel
    </div>
    <button type="submit" class="ui right red labeled icon button" @click="remove()">
      Unset
      <i class="money icon"></i>
    </button>
    <button type="submit" class="ui right green labeled icon button" @click="add()">
      Set
      <i class="money icon"></i>
    </button>
  </div>
</div>
</template>

<style scoped>
input[type="text"]{
  width: 100px !important;
  text-align: right;
}

.small-money-input{
  width: 60px !important;
}
</style>

<script>
import * as types from '../../vuex/mutation-types'
import $ from 'jquery'

export default {
  props: ['index', 'item'],
  components: {},
  data () {
    return {
      id: this.item.id,
      stack_size: 1,
      min_qty: 1
    }
  },
  computed: {
    tracker () {
      return this.tracked_items[this.index]
    },
    stock () {
      return (this.inventory[this.tracker.id]) ? this.inventory[this.tracker.id].quantity : 0
    }
  },
  ready () {
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
    getters: {
      tracked_items: state => state.tracker.tracked_items,
      inventory: state => state.profile.inventory
    },
    actions: {
      add (store, index) {
        store.dispatch(types.ADD_AUTOSELL_ITEM, {
          id: this.id,
          stack_size: this.stack_size,
          min_qty: this.min_qty
        })
        this.close()
      },
      remove (store, index) {
        store.dispatch(types.REMOVE_AUTOSELL_ITEM, {
          id: this.id
        })
        this.close()
      }
    }
  }
}
</script>
