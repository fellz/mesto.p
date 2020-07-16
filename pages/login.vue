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
        this.$store.dispatch("getProfile")
        this.$nuxt.$router.replace({ path: '/projects'})
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
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
</style>