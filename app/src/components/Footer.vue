<template>
  <div class="ui inverted small bottom fixed borderless menu footer">
    <div class="ui container">
      <profile></profile>
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
</div>
</template>

<style>
.footer{
  color:#fff;
  font-weight: 300;
}
</style>

<script>
import Profile from './Profile'

export default {
  components: {
    Profile
  }
}
</script>
