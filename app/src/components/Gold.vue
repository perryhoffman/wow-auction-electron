<template>
<span class="gold">
  <span class="money"><span class="money" v-text="formatted.gold"></span><img src="../assets/gold.gif"/></span>
  <span class="money"><span class="silver" v-text="formatted.silver"></span><img src="../assets/silver.gif"/></span>
  <span class="money"><span class="copper" v-text="formatted.copper"></span><img src="../assets/copper.gif"/></span>
</span>
</template>

<style lang="scss" scoped>
  .gold{
    display:inline-block;
  }

  .gold.padded{
    padding: 0 8px;
  }

  .gold.no-icon{
    img{
      opacity:0;
      margin:0;
      width: 5px;
    }
  }
  .money{
    font-family: Arial, Verdana;
    font-size: 11px;
    letter-spacing: -0.2px;
    
    img{
      margin-left:2px !important;
      height: 12px !important;
      width: 12px !important;
    }
  }

  .gold{
    color:#c28a13;
  }

  .silver{
    color:#A1A19E;
  }
  
  .copper{
    color:#a04d00;
  }
</style>

<script>
import utils from '../services/utils'

export default {
  props: ['amount'],
  computed: {
    formatted () {
      return utils.extractMoney(this.amount)
    }
  }
}
</script>
