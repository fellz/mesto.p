<template>
  <div>
    
  </div>
</template>

<script>

export default {
  middleware: ["auth"],
  created(){
    this.$nuxt.$router.replace({ path: '/projects'});
  }
};
</script>

<style>
</style>

