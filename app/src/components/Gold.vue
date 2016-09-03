<template>
<span>
  <span class="gold" v-text="gold"></span><img src="../assets/gold.gif"/>
  <span class="silver" v-text="silver"></span><img src="../assets/silver.gif"/>
  <span class="copper" v-text="copper"></span><img src="../assets/copper.gif"/>
</span>
</template>

<style scoped>
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
export default {
  props: ['gold', 'silver', 'copper'],
  propsData: {
    gold: 0,
    silver: 0,
    copper: 0
  }
}
</script>
