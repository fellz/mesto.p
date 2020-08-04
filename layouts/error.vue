<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <div v-else>
      <h4>An error occurred</h4>
    </div>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>