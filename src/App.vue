<template>
<div id="app">
  <my-menu></my-menu>
  <img src="./assets/logo.png">
  <router-view></router-view>
</div>
</template>

<script>
import MyMenu from '@/components/MyMenu'
import Vue from 'vue'

export default {
  name: 'app'
}

Vue.component('my-menu', MyMenu)
</script>

<style>
html{
  overflow-y: scroll;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0px auto;
  padding: 0px;
  max-width: 960px;
}
</style>
