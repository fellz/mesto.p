<template>
  <div id="toplevel">
    <top-menu />
    <div class="nuxt-wrapper">
      <nuxt class="nuxt container" />
    </div>
    
  </div>
</template>

<script>
// reload project
import TopMenu from "~/components/common/Menu.vue";
export default {
   components: {
    TopMenu
  }
}
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  font-family: "Montserrat", sans-serif ;
}
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}


/* Custom css */

@media (min-width: 1200px) {
    .container{
        max-width: 970px;
    }
}
section{
  margin: 20px 0;
}
.nuxt{
  padding-top:70px;
  padding-bottom: 50px;

}
.nuxt-wrapper{
  background-color:  #e3e3e3;
}
.mesto_card{
  background-color: white;
  border-radius: 8px;
  padding: 20px;
}
</style>

