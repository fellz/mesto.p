<template>
  <div>
    <section class="login_container">
      <h4>Login</h4>
      <hr />
      <form v-if="!$store.state.authUser" @submit.prevent="register">
        <p v-if="formError" class="error">{{ formError }}</p>
        <p>
          Username:
          <input v-model="username" type="text" name="username" class="form-control" placeholder="имя" />
        </p>
        <p>
          Email:
          <input v-model="email" type="text" name="username" class="form-control" placeholder="email" />
        </p>
        <p>
          Password:
          <input v-model="password" type="password" name="password" class="form-control" placeholder="password" />
        </p>
        <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
      </form>
      <div v-if="reg_success">
        <h4>Успешно</h4> 
        <nuxt-link to="/login">Теперь можно залогиниться</nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      formError: null,
      username: '',
      email: '',
      password: '',
      reg_success: false
    }
  },
  methods: {
    async register () {
      let user = {
        username: this.username, 
        email: this.email,
        password: this.password,
      };
      
      const { data } = await axios.post(
        "http://localhost:1337/users",
        user
      );
      const profile = {
        about: "Расскажите о себе",
        experience: "Расскажите о своем опыте в профессии и создании проектов",
        user: data.id
       }
      const { data: profile_resp} = await axios.post(
        "http://localhost:1337/profiles",
        profile
      );
      this.$store.dispatch("setProfile", {profile: profile_resp});
      this.reg_success = true;
    }
  }
};
</script>

<style>
.login_container {
  margin-left: 100px;
  width: 30%;
}
</style>