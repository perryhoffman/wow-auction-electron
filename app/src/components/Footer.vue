<template>
    <div class="ui inverted small bottom fixed borderless menu footer">
        <div class="ui container">
            <div class="left menu">
                <div class="item">
                    <div class="ui primary button" v-on:click="openLogin()">Log in to Battle.net</div>
                </div>
                <div class="item">
                    <h6 class="ui header inverted left floated">
                        GOLD
                        <div class="sub header">99</div>
                    </h6>
                </div>
                <div class="item">
                    <h6 class="ui header inverted left floated">
                        EARNED
                        <div class="sub header">99</div>
                    </h6>
                </div>
                <div class="item">
                    <h6 class="ui header inverted left floated">
                        TOTAL
                        <div class="sub header">99</div>
                    </h6>
                </div>
            </div>

            <div class="right menu">
                <div class="item">
                    <h6 class="ui header inverted left floated">
                        TOTAL
                        <div class="sub header">99</div>
                    </h6>
                </div>
            </div>
        </div>
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

$.ajax('http://us.battle.net/wow/en/character/kelthuzad/Ragedmonkey/simple')
  .then(function (res) {
    let el = $(res)

    console.log(el.find('.username').text())
  })

export default {
  methods: {
    openLogin () {
      ipcRenderer.send('login-popup')
    }
  }
}
</script>
