<template>
<span>
  <li class="work" @click="openModal()">
    <div class="image-box"><img class="img" :src="data.thumbnail" alt="thumbnail"></div>
    <div class="contain">
      <div class="title">{{data.title}}</div>
      <div class="summary">{{data.summary}}</div>
      <div class="date">{{data.date}}</div>
      <div class="tag-label"><tag class="tag" v-for="tag in data.tags" :key="tag" :tagName="tag">{{tag}}</tag></div>
    </div>
  </li>
  <modal class="window" v-if="showModal" @close="showModal=false">
    <div class="modal">
      <div class="image-box"><img class="img" :src="detail.images[0]" alt="thumbnail"></div>
      <div class="contain">
        <div class="title">{{detail.title}}</div>
        <div class="description">{{detail.description}}</div>
        <div class="date">{{detail.date}}</div>
        <div class="tag-label"><tag class="tag" v-for="tag in detail.tags" :key="tag" :tagName="tag">{{tag}}</tag></div>
      </div>
    </div>
  </modal>
</span>
</template>

<script>
import Modal from '@/components/Modal'
import axios from 'axios'

const Tag = {
  props: ['tagName'],
  template: `<span class='tag'>{{tagName}}</span>`
}

export default {
  name: 'work',
  props: ['data'],
  data: function () {
    return {
      showModal: false,
      detail: null
    }
  },
  created: function () {
    console.log('work created')
  },
  components: {
    'tag': Tag,
    'modal': Modal
  },
  methods: {
    openModal: function () {
      if (!this.detail) {
        axios.get(this.data.url)
        .then(data => {
          this.detail = data.data
        })
      }
      this.showModal = true
    }
  }
}
</script>

<style lang='scss'>
.work{
  display: flex;
  border: outset 2px black;
  border-radius: 5px;
  background-color: #f0f0f0;
  margin: 10px;
  padding: 5px;
  width: 440px;
  cursor: pointer;
  transition: all 0.2s;
  transition-timing-function: ease-in-out;
  &:hover{
    box-shadow: 4px 4px 10px 0px rgba(100, 100, 100, 0.4);
  }

  .image-box{
    width: 200px;
    height: 130px;
    .img{
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      background-color: #fff;
    }
  }
}

.contain{
  text-align: left;
  width: 100%;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  align-self: strech;
  padding-left: 8px;

  .title{
    font-size: 1.5em;
  }

  .summary{
    height:100%
  }

  .description{
    height: 100%;
  }

  .date{
    text-align: right;
    font-size: 0.4em;
    font-color: gray;
  }

  .tag-label{
    align-self: flex-start;
    &:before{
      content: '\f02c';
      font-family: FontAwesome;
      margin-right: 3px;
    }

    .tag{
      margin-right: 5px;
      border-radius: 3px;
      font-size: 0.8em;
      padding: 2px 5px;
      background-color: #ddd;
    }
  }
}

.modal{
  width: 600px;
  display: flex;
  .image-box{
    width: 400px;
    height: 350px;
    .img{
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      background-color: #fff;
    }
  }
}
</style>
