<template>
  <div class="ui primary button" v-on:click="openLogin()" v-if="!loggedIn">Log in to Battle.net</div>
  <div class="ui basic button inverted" v-if="loggedIn" v-text="character"></div>
</div>
</template>

<style>
.footer{
  color:#fff;
  font-weight: 300;
}

.financial-info{
  float:left;
}

.financial-info + .financial-info{
  margin-left: 2.5em;
}
</style>

<script>
import {ipcRenderer} from 'electron'
import $ from 'jquery'

const API_URL = 'https://us.battle.net/wow/en/vault/character/auction/'

export default {
  data () {
    return {
      loggedIn: false,
      character: 'None'
    }
  },
  ready () {
    $.ajax({
      type: 'GET',
      url: API_URL
    })
    .then((res) => {
      let el = $(res)

      el.find('.character-list .primary a.char').each((index, el) => {
        console.log($(el).attr('href'))
      })

      this.loggedIn = true
      this.character = el.find('.character-name').text()
    })
  },
  methods: {
    openLogin () {
      ipcRenderer.send('login-popup')
    }
  }
}
</script>
