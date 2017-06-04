<template>
<div>
  <h1>Works</h1>
  <div>
    とーふとふがこれまで作った物の紹介です。
  </div>
  <ul id="works">
    <work v-for="work in works" :data="work"></work>
  </ul>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Work from '@/components/Work'

export default{
  data: function () {
    return {
      works: []
    }
  },
  created: function () {
    console.log('po')
    axios.get('/static/json/works.json')
    .then(data => {
      this.works = data.data.data
    })
  }
}

Vue.component('work', Work)
</script>

<style lang='scss'>
#works{
  padding: 0px;
  display: flex;
}
</style>
