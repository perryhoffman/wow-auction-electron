<template>
<div class="ui container">
  <div class="left menu">
    <div class="item">
      <div class="ui primary button" v-on:click="openLogin()" v-show="!currentCharacter">Log in to Battle.net</div>
      <div class="ui top pointing dropdown basic button inverted" v-show="currentCharacter">
        <span class="text" v-text="currentCharacter"></span>
        <div class="ui secondary vertical pointing menu">
          <a class="teal item" v-for="(index, character) in characters" v-on:click="selectCharacter(character, index)" :class="{'active': character.active}">
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
          <gold :gold="money.gold" :silver="money.silver" :copper="money.copper"></gold>
        </div>
      </h6>
    </div>
    <div class="item">
      <h6 class="ui header inverted left floated">
        EARNED
        <div class="sub header">
          <gold :gold="earned.gold" :silver="earned.silver" :copper="earned.copper"></gold>
        </div>
      </h6>
    </div>
    <div class="item">
      <h6 class="ui header inverted left floated">
        TOTAL
        <div class="sub header">
          <gold :gold="total_money.gold" :silver="total_money.silver" :copper="total_money.copper"></gold>
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
import $ from 'jquery'

const API_URL = 'https://us.battle.net/wow/en/vault/character/auction/'
const API_SET_PREF_URL = 'https://us.battle.net/wow/en/pref/character'
const API_MONEY_URL = 'https://us.battle.net/wow/en/vault/character/auction/money'

export default {
  data () {
    return {
      xstoken: null,
      money: {},
      earned: {},
      total_money: {},
      currentCharacter: null,
      characters: [],
      items_selling: 0,
      items_sold: 0,
      items_ended: 0,
      items_won: 0
    }
  },
  computed: {
    total_money () {
      let total = utils.extractMoney(utils.getFullAmount(this.money) + utils.getFullAmount(this.earned))
      return {
        gold: total.gold,
        silver: total.silver,
        copper: total.copper
      }
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
      this.currentCharacter = $html.find('.character-name').text()
      return this.currentCharacter
    },
    getCharacterList ($html) {
      this.characters = []

      $html.find('.character-list .primary a.char').each((index, el) => {
        var $el = $(el)

        this.characters.push({
          name: $el.find('.name').text(),
          desc: $el.find('.class').text(),
          realm: $el.find('.realm').text(),
          href: $el.attr('href'),
          active: $el.hasClass('pinned')
        })
      })

      return this.characters
    },
    getXstoken ($html) {
      this.xstoken = $html.find('body').html().match(/var xsToken = '(.*)';/)[1]
    },
    getAuctionActivity ($html) {
      let activity = $html.find('.activity table tr')
      this.items_selling = activity.eq(1).find('td').eq(1).text()
      this.items_sold = activity.eq(2).find('td').eq(1).text()
      this.items_ended = activity.eq(3).find('td').eq(1).text()
      this.earned = {
        gold: parseInt(activity.eq(4).find('td').eq(1).find('.icon-gold').text()) || 0,
        silver: parseInt(activity.eq(4).find('td').eq(1).find('.icon-silver').text()) || 0,
        copper: parseInt(activity.eq(4).find('td').eq(1).find('.icon-copper').text()) || 0
      }

      this.items_won = activity.eq(2).find('td').eq(1).text()
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
        this.money = utils.extractMoney(res.money)
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
        this.currentCharacter = character.name
      })
    }
  }
}
</script>
