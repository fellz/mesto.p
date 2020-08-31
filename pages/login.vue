<template>
  <v-row justify="center">
    <v-col sm=6>
      <div v-if="wait"  class="wait">Загружаемся...</div>

      <v-form v-if="!$store.state.authUser" @submit.prevent="login"> 
        <v-text-field
          v-model="email"
          label="Email"
          required
        ></v-text-field>
        
        <v-text-field
          v-model="password"
          label="Password"
          required
          type="password"
        ></v-text-field>
        <v-btn color="success" type="submit" :disabled="wait">Login</v-btn>
      </v-form>

    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      formError: null,
      email: '',
      password: '',
      wait: false
    }
  },
  methods: {
    async login () {
      this.wait = true;
      try {
        await this.$store.dispatch('login', {
          identifier: this.email,
          password: this.password
        })
        this.email = ''
        this.password = ''
        this.formError = null
        this.wait = false

        // set token for requests
        this.$axios.setToken(this.$store.state.authUser.jwt, 'Bearer', ['put','post', 'delete'])
        
        document.cookie = `jwt=${this.$store.state.authUser.jwt};SameSite=Strict;secure=true;max-age=10800`
        const prof = this.$store.state.authUser.user.profile
        
        if (prof){
          document.cookie = `profile_id=${prof.id};SameSite=Strict;secure=true;max-age=10800`
          const profl = await this.$axios.$get(`/profiles/${prof.id}`)  
          this.$store.dispatch('setProfile', { profile: profl })
        }
        // redirect to porjects
        this.$nuxt.$router.replace({ path: '/projects'})
      
      } catch (e) {
        this.formError = e.message
          this.wait = false
      }
    }
  }
};
</script>

<style >
.login{
  width:50%;
}
.wait{
  color: red;
}
.error{
  color: red;
}
</style>