<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <span class="navbar-brand">Mesto projects</span>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <nuxt-link to="/" class="nav-link">Главная</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/profiles" class="nav-link">Участники</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/projects" class="nav-link">Проекты</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link v-if="$store.state.authUser" to="/projects/new" class="nav-link">Создать проект</nuxt-link>
        </li>
      </ul>
      <nuxt-link to="/register" v-if="!$store.state.authUser" class="nav-link">Регистрация</nuxt-link>
      <nuxt-link to="/login" v-if="!$store.state.authUser" class="nav-link">Войти</nuxt-link>
      <button type="button" class="btn btn-link" v-if="$store.state.authUser" @click="logout">Выйти</button>
      <nuxt-link to="/my" v-if="$store.state.authUser" class="nav-link">{{ full_name }}</nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      full_name: "Профиль"
    };
  },
  watch: {
    "$store.state.userProfile": function() {
      if(this.$store.state.userProfile.fullname != null){
        this.full_name = this.$store.state.userProfile.fullname
      }else{
        this.full_name = "Профиль"
      }
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.replace({ path: "/" });
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>