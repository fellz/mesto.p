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
    //console.log(this.$route.query.id_token)
    const resp = await this.$axios.$get(`/auth/google/callback?id_token=${this.$route.query.id_token}`)
    console.log(resp)
  }
}
</script>