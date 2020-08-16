<template>
  <div>{{resp}}</div>
</template>

<script>
export default {
  data(){
    return {
      resp: "test"
    }
  },
  async created(){
    const resp = await this.$axios.$get(`/auth/google/callback?access_token=${this.$route.query.id_token}`)
    console.log(resp)
  }
}
</script>