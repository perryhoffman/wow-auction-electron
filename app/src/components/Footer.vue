<template>
  <div class="ui inverted small bottom fixed borderless menu footer">
    <div class="ui container">
      <div class="left menu">
        <div class="item">
          <profile></profile>
        </div>
        <div class="item">
          <h6 class="ui header inverted left floated">
            GOLD
            <div class="sub header">
              <img src="../assets/gold.gif"/><span>999</span>
              <img src="../assets/silver.gif"/><span>99</span>
              <img src="../assets/copper.gif"/><span>99</span>
            </div>
          </h6>
        </div>
        <div class="item">
          <h6 class="ui header inverted left floated">
            EARNED
            <div class="sub header">
              <img src="../assets/gold.gif"/><span>999</span>
              <img src="../assets/silver.gif"/><span>99</span>
              <img src="../assets/copper.gif"/><span>99</span>
            </div>
          </h6>
        </div>
        <div class="item">
          <h6 class="ui header inverted left floated">
            TOTAL
            <div class="sub header">
              <img src="../assets/gold.gif"/><span>999</span>
              <img src="../assets/silver.gif"/><span>99</span>
              <img src="../assets/copper.gif"/><span>99</span>
            </div>
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
// import {ipcRenderer} from 'electron'
// import $ from 'jquery'

// $.ajax({
//   type: 'GET',
//   url: 'https://us.battle.net/wow/en/vault/character/auction/'
// })
//   .then(function (res) {
//     let el = $(res)

//     el.find('.character-list .primary a.char').each((index, el) => {
//       console.log($(el).attr('href'))
//     })
//   })
import Profile from './Profile'

export default {
  components: {
    Profile
  }
}
</script>
