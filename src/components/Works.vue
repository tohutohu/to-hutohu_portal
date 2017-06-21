<template>
<div>
  <h1>Works</h1>
  <div>
    とーふとふがこれまで作った物の紹介です。
  </div>
  <ul id="works">
    <work v-for="work in works" :key="work.name" :data="work"></work>
    <span v-if="works.length % 2 != 0" class="spacer"></span>
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
    axios.get('/static/json/works-list.json')
    .then(data => {
      this.works = data.data
    })
  }
}

Vue.component('work', Work)
</script>

<style lang='scss' scoped>
#works{
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.spacer{
  margin: 10px;
  padding: 5px;
  width: 440px;
}

</style>
