<template>
<div class="ui container">
  <div class="left menu">
    <div class="item">
      <div class="ui primary button" v-on:click="openLogin()" v-show="!character">Log in to Battle.net</div>
      <div class="ui top pointing dropdown basic button inverted" v-show="character">
        <span class="text" v-text="character.name"></span>
        <div class="ui secondary vertical pointing menu">
          <a class="teal item" v-for="(index, character) in character_choices" v-on:click="selectCharacter(character, index)" :class="{'active': character.active}">
            <h5 class="ui header" :class="{'teal': character.active}">
              {{character.name}}
              <div class="sub header">{{character.desc}}</div>
            </h5>
          </a>
        </div>
      </div>
    </div>
    <div class="item">
      <h6 class="ui header inverted left floated">
        GOLD
        <div class="sub header">
          <gold :amount="money"></gold>
        </div>
      </h6>
    </div>
    <div class="item">
      <h6 class="ui header inverted left floated">
        EARNED
        <div class="sub header">
          <gold :amount="money_earned"></gold>
        </div>
      </h6>
    </div>
    <div class="item">
      <h6 class="ui header inverted left floated">
        TOTAL
        <div class="sub header">
          <gold :amount="money_total"></gold>
        </div>
      </h6>
    </div>
  </div>
  <div class="right menu">
    <div class="item">
      <h6 class="ui header inverted left floated">
        SELLING
        <div class="sub header" v-text="items_selling"></div>
      </h6>
    </div>
    <div class="item">
      <h6 class="ui header inverted left floated">
        SOLD
        <div class="sub header" v-text="items_sold"></div>
      </h6>
    </div>
    <div class="item">
      <h6 class="ui header inverted left floated">
        ENDED
        <div class="sub header" v-text="items_ended"></div>
      </h6>
    </div>
    <div class="ui divider"></div>
    <div class="item">
      <h6 class="ui header inverted left floated">
        WON
        <div class="sub header" v-text="items_won"></div>
      </h6>
    </div>
  </div>
</div>
</template>

<style>
</style>

<script>
import {ipcRenderer} from 'electron'
import Gold from './Gold'
import utils from '../services/utils'
import * as types from '../vuex/mutation-types'
import $ from 'jquery'

const API_URL = 'https://us.battle.net/wow/en/vault/character/auction/'
const API_SET_PREF_URL = 'https://us.battle.net/wow/en/pref/character'
const API_MONEY_URL = 'https://us.battle.net/wow/en/vault/character/auction/money'

export default {
  data () {
    return {
      items_selling: 0,
      items_sold: 0,
      items_ended: 0,
      items_won: 0
    }
  },
  vuex: {
    getters: {
      xstoken: state => state.xstoken,
      money: state => state.profile.money,
      money_earned: state => state.profile.money_earned,
      character: state => state.profile.character,
      character_choices: state => state.profile.character_choices
    },
    actions: {
      setMoney (store, amount) {
        store.dispatch(types.PROFILE_SET_MONEY, amount)
      },
      setMoneyEarned (store, amount) {
        store.dispatch(types.PROFILE_SET_MONEY_EARNED, amount)
      },
      setCharacter (store, character) {
        store.dispatch(types.PROFILE_SET_CHARACTER, character)
      },
      setCharacterChoices (store, characterChoices) {
        store.dispatch(types.PROFILE_SET_CHARACTER_CHOICES, characterChoices)
      },
      setXSToken (store, token) {
        store.dispatch(types.AUTH_SET_XSTOKEN, token)
      }
    }
  },
  computed: {
    money_total () {
      return this.money + this.money_earned
    }
  },
  components: {
    Gold
  },
  ready () {
    // Initial Dropdown
    $(this.$el).find('.dropdown').dropdown({
      action: 'hide'
    })

    this.fetchProfile()
    this.fetchInterval = setInterval(() => {
      this.fetchProfile()
    }, 5000)

    this.fetchMoney()
    this.moneyInterval = setInterval(() => {
      this.fetchMoney()
    }, 5000)
  },
  beforeDestroy () {
    clearInterval(this.fetchInterval)
    clearInterval(this.moneyInterval)
  },
  methods: {
    openLogin () {
      ipcRenderer.send('login-popup')
    },
    getCurrentCharacter ($html) {
      let $el = $html.find('.character-list .primary a.char.pinned')

      this.setCharacter({
        name: $el.find('.name').text(),
        desc: $el.find('.class').text(),
        realm: $el.find('.realm').text(),
        href: $el.attr('href')
      })
    },
    getCharacterList ($html) {
      let characters = []

      $html.find('.character-list .primary a.char').each((index, el) => {
        var $el = $(el)

        characters.push({
          name: $el.find('.name').text(),
          desc: $el.find('.class').text(),
          realm: $el.find('.realm').text(),
          href: $el.attr('href'),
          active: $el.hasClass('pinned')
        })
      })

      this.setCharacterChoices(characters)
    },
    getXstoken ($html) {
      let xstoken = $html.find('body').html().match(/var xsToken = '(.*)';/)[1]
      this.setXSToken(xstoken)
    },
    getAuctionActivity ($html) {
      let activity = $html.find('.activity table tr')
      this.items_selling = activity.eq(1).find('td').eq(1).text()
      this.items_sold = activity.eq(2).find('td').eq(1).text()
      this.items_ended = activity.eq(3).find('td').eq(1).text()

      this.items_won = activity.eq(2).find('td').eq(3).text()

      let moneyEarned = {
        gold: parseInt(activity.eq(4).find('td').eq(1).find('.icon-gold').text()) || 0,
        silver: parseInt(activity.eq(4).find('td').eq(1).find('.icon-silver').text()) || 0,
        copper: parseInt(activity.eq(4).find('td').eq(1).find('.icon-copper').text()) || 0
      }

      this.setMoneyEarned(utils.getFullAmount(moneyEarned))
    },
    scrapeProfile ($html) {
      this.getCurrentCharacter($html)
      this.getCharacterList($html)
      this.getXstoken($html)
      this.getAuctionActivity($html)

      return $html
    },
    fetchProfile () {
      $.ajax({
        type: 'GET',
        url: API_URL
      })
      .then((html) => {
        return $(html)
      })
      .then(this.scrapeProfile)
    },
    fetchMoney () {
      $.ajax({
        type: 'GET',
        url: API_MONEY_URL
      })
      .then((res) => {
        this.setMoney(res.money)
      })
    },
    selectCharacter (character, index) {
      $.ajax({
        type: 'POST',
        url: API_SET_PREF_URL,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        data: {
          index,
          xstoken: this.xstoken
        }
      }).then((res) => {
        this.setCharacter(character)
      })
    }
  }
}
</script>
