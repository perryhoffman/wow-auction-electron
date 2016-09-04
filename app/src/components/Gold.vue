<template>
<span>
  <span class="money"><span class="money" v-text="formatted.gold"></span><img src="../assets/gold.gif"/></span>
  <span class="money"><span class="silver" v-text="formatted.silver"></span><img src="../assets/silver.gif"/></span>
  <span class="money"><span class="copper" v-text="formatted.copper"></span><img src="../assets/copper.gif"/></span>
</span>
</template>

<style lang="scss" scoped>
  .money{
    font-family: Arial, Verdana;
    font-size: 12px;
    letter-spacing: -0.2px;
    
    img{
      margin-left:2px;
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
