<template>
<form action="#" class="ui small modal" v-on:submit.stop.prevent="saveAlertSettings()">
  <i class="close icon"></i>
  <div class="header">
    Manage Alerts
  </div>
  <div class="content">
    <div class="ui form">
      <h4 class="ui dividing header">Price Below</h4>
      <div class="inline fields">
        <label>Gold</label>
        <div class="field">
          <input type="text" placeholder="Gold" v-model="gold">
        </div>
        <div class="field">
          <input type="text" placeholder="Silver" v-model="silver">
        </div>
        <div class="field">
          <input type="text" placeholder="Copper" v-model="copper">
        </div>
      </div>

      <h4 class="ui dividing header">Alert Settings</h4>

      <div class="ui segment field">
        <div class="inline field">
          <div class="ui toggle checkbox">
            <label>Play notification sound</label>
            <input type="checkbox" tabindex="0" class="hidden" v-model="notification">
          </div>
        </div>
      </div>
      <div class="ui segment field">
        <div class="inline field">
          <div class="ui toggle checkbox">
            <label>Auto Buy</label>
            <input type="checkbox" tabindex="0" class="hidden" v-model="autobuy">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="actions">
    <div class="ui left floated grey deny button">
      Cancel
    </div>
     <div class="ui red labeled icon button"  @click="cancelAlert()">
      Stop Alert
      <i class="mute icon"></i>
    </div>
    <button type="submit" class="ui right green labeled icon button" @click="saveAlertSettings()">
      Set Alert
      <i class="alarm icon"></i>
    </button>
  </div>
</form>
</template>

<style scoped>
input{
  width: 100px !important;
}
</style>

<script>
import $ from 'jquery'
import utils from '../../services/utils'
import * as types from '../../vuex/mutation-types'

export default {
  props: ['index'],
  data () {
    return {
      notification: false,
      autobuy: false,
      gold: null,
      silver: null,
      copper: null
    }
  },
  computed: {
    tracker () {
      return this.tracked_items[this.index]
    }
  },
  ready () {
    $(this.$el).find('.toggle').checkbox()

    this.gold = null
    this.silver = null
    this.copper = null
  },
  methods: {
    open () {
      let alertAmount = utils.extractMoney(this.tracker.alertAmount)
      this.gold = alertAmount.gold
      this.silver = alertAmount.silver
      this.copper = alertAmount.copper

      this.notification = this.tracker.notification
      this.autobuy = this.tracker.autobuy

      $(this.$el).modal('show')
    },
    close () {
      $(this.$el).modal('hide')
    },
    cancelAlert () {
      this.changeAlertSettings({
        alertAmount: null,
        notification: false,
        autobuy: false
      })

      this.close()
    },
    saveAlertSettings () {
      let alertAmount = utils.getFullAmount({
        gold: this.gold,
        silver: this.silver,
        copper: this.copper
      })

      this.changeAlertSettings({
        alertAmount,
        notification: this.notification,
        autobuy: this.autobuy
      })

      this.close()
    }
  },
  vuex: {
    getters: {
      tracked_items: state => state.tracker.tracked_items
    },
    actions: {
      changeAlertSettings (store, settings) {
        store.dispatch(types.TRACKER_UPDATE_ALERT, this.index, {
          ...settings
        })
      }
    }
  }
}
</script>
