<template>
  <div>
    <div v-if="wait"  class="wait">Загружаемся...</div>
    <section class="login">
      <h4>Login</h4>
      <hr />
      <form v-if="!$store.state.authUser" @submit.prevent="login">
        <p v-if="formError" class="error">{{ formError }}</p>
        <p>
          Email:
          <input v-model="email" type="text" name="email" class="form-control" placeholder="email" />
        </p>
        <p>
          Password:
          <input v-model="password" type="password" name="password" class="form-control" placeholder="password" />
        </p>
        <button type="submit"  class="btn btn-primary" :disabled="wait">Login</button>
      </form>
    </section>
  </div>
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
        
        // set profile
        this.$store.dispatch("setProfileAfterLogin");
        
        // set token for requests
        this.$axios.setToken(this.$store.state.authUser.jwt, 'Bearer', ['put','post', 'delete'])
        
        document.cookie = `jwt=${this.$store.state.authUser.jwt};max-age=10800`
        document.cookie = `profile_id=${this.$store.state.authUser.user.id};max-age=10800`
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