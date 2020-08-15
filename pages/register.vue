<template>
  <div>
    <section class="row">
      <div class="col-sm-6"> 
        <h4>Регистрация</h4>
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
          <button :disabled="loading" type="submit" class="btn btn-primary">Зарегистрироваться</button>
        </form>
        <div v-if="reg_success">
          <h4>Успешно</h4> 
          <nuxt-link to="/login">Теперь можно залогиниться</nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data () {
    return {
      formError: null,
      username: '',
      email: '',
      password: '',
      reg_success: false,
      loading: false
    }
  },
  methods: {
    async register () {
      this.loading = true;
      let user = {
        username: this.username, 
        email: this.email,
        password: this.password,
      };
      try {
        const data = await this.$axios.$post(`/auth/local/register`,
          user
        );
        const profile = {
          about: "Расскажите о себе",
          experience: "Расскажите о своем опыте в профессии и создании проектов",
          fullname: "Иван Иванович",
          user: data.id
        }
        const profile_resp = await this.$axios.$post(`/profiles`,
          profile
        );
        this.$store.dispatch("setProfile", {profile: profile_resp});
        //final stuff
        this.reg_success = true;
        this.loading = false;
        this.username =  '';
        this.email = '';
        this.password = '';
      } catch (e) {
        this.formError = e.message
      }
    }
  }
};
</script>
