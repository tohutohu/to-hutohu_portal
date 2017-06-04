<template>
  <div class="work">
    <div class="work-title">{{data.title}}</div>
    <div class="work-description">{{data.description}}</div>
    <div class="work-date">{{data.date}}</div>
    <img class="work-img" :src="data.thumbnail" alt="thumbnail">
    <div class="work-tag" v-for="tag in data.tags">{{tag}}</div>
  </div>
</template>

<script>
  export default {
    name: 'work',
    props: ['data'],
    created: function () {
      console.log('work created')
    }
  }
</script>

<style>


</style>
