<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <hello></hello>
    <p>
      Welcome to your Vue.js app!
    </p>
    <p>
      <button v-on:click="open()">Open</button>
    </p>
  </div>
</template>

<script>
import Hello from './components/Hello'
// import electron from 'electron'

export default {
  components: {
    Hello
  },
  methods: {
    open: () => {
      let login = window.open('https://us.battle.net/login/en/', 'Login to Battle.net', 'autoHideMenuBar=yes')
      login.eval('console.log(window)', function () {
        console.log('ha')
      })
    }
  }
}
</script>

<style>
  
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px;
}
</style>
