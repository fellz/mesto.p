<template>
  <div>Успешно! Сейчас будет редирект, секундочку....</div>
</template>

<script>
export default {
  async created(){
    const resp = await this.$axios.$get(`/auth/google/callback?access_token=${this.$route.query.id_token}`)
    //console.log(user)
    // set user in store with jwt and user
    this.$store.commit('SET_USER', resp)
    document.cookie = `jwt=${resp.jwt};path=/;max-age=10800`
    this.$axios.setToken(resp.jwt, 'Bearer', ['put','post', 'delete'])
    this.$router.replace('/profiles/new')
    // const profile = resp.user.profile;
    // // if profile undefined --> create profile
    // if(!profile){
    //   await this.createProfile(resp.user.id)
    //   this.setCookieToken(resp)
    // }else{
    //   // else get profile and set it store and redirect
    //   const profile = await this.$axios.$get(`/profiles/${resp.user.profile.id}`)
    //   this.$store.dispatch("setProfile", {profile});
    //   this.setCookieToken(resp)
    // }
  },
  methods:{
    setCookieToken(resp){
      document.cookie = `jwt=${resp.jwt};path=/;max-age=10800`
      document.cookie = `profile_id=${resp.user.profile.id};path=/;max-age=10800`
      // localStorage.setItem('jwt', resp.jwt)
      // localStorage.setItem('profile_id', resp.user.profile.id)
      this.$axios.setToken(resp.jwt, 'Bearer', ['put','post', 'delete'])
      this.$router.replace('/profiles');
    },
    async createProfile(id){
      const profile = {
        about: "Расскажите о себе",
        experience: "Расскажите о своем опыте в профессии и создании проектов",
        fullname: "Иван Иванович",
        user: id
      }
      const profile_resp = await this.$axios.$post(`/profiles`, profile );
      this.$store.dispatch("setProfile", {profile: profile_resp});
    }
  }
}
</script>