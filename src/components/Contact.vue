<template>
<div id="contact">
  <h1>Contact</h1>
  <div id="description">
    Twitterが一番反応が早いと思います
  </div>
  <ul>
    <li id="mail">mail: <a href="mailto:tohu.soy@gmail.com">tohu.soy@gmail.com</a></li>
    <li id="twitter">Twitter: <a href="https://twitter.com/to_hutohu">@to_hutohu</a></li>
    <li id="github">GitHub: <a href="https://github.com/tohutohu">tohutohu</a></li>
  </ul>
</div>
</template>

<script>

</script>

<style lang='scss'>
#contact{
  ul{
    li{
      list-style: none;
      font-size: 1.5em;
      margin-top: 0.4em;
    } 
    
    #mail{
      &:before{
        font-family: FontAwesome;
        content: '\f003';
        margin-right: 8px;
      }
    }

    #twitter{
      &:before{
        font-family: FontAwesome;
        content: '\f099';
        margin-right: 8px;
      }
    }

    #github{
      &:before{
        font-family: FontAwesome;
        content: '\f09b';
        margin-right: 8px;
      }
    }
  }
}
</style>
