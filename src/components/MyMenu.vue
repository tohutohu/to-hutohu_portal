<template>
<div id='menu'>
  <ul>
    <router-link tag='li' to='/'>Top</router-link>
    <router-link tag='li' to='/about'>about</router-link>
    <router-link tag='li' to='/works'>works</router-link>
    <router-link tag='li' to='/blog'>blog</router-link>
    <router-link tag='li' to='/contact'>contact</router-link>
  </ul>
</div>
</template>

<script>
export default{
  name: 'my-menu'
}
</script>

<style lang='scss'>
$color:#234;
#menu{
  padding: auto;
  display: flex;
  justify-content: center;
  ul{
    display: flex;
    padding: 0px;
    li{
      padding: 15px;
      list-style: none;
      width: 150px;
      background-color: $color;
      color: #fff;
      cursor: pointer;
      &:hover{
        background-color: $color+123;
      }
      

      &:first-child{
        border-radius: 10px 0 0 10px;
      }

      &:last-child{
        border-radius: 0 10px 10px 0;
      }
    }
  }
}

</style>
