<template>
<span>
  <span v-text="gold"></span><img src="../assets/gold.gif"/>
  <span v-text="silver"></span><img src="../assets/silver.gif"/>
  <span v-text="copper"></span><img src="../assets/copper.gif"/>
</span>
</template>

<style>
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
