<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <span class="navbar-brand">
      <img src="/assets/brand/mesto-p.jpg" width="30" height="30" alt="" loading="lazy">
    </span>
    <span class="navbar-brand">Mesto.platform</span>
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
          <nuxt-link to="/teams" class="nav-link">Команды</nuxt-link>
        </li>
        <li class="nav-item">
          <b><nuxt-link v-if="$store.state.authUser" to="/projects/auth/new" class="nav-link">Создать проект</nuxt-link></b>
        </li>
        <li class="nav-item">
          <b><nuxt-link v-if="$store.state.authUser" to="/teams/auth/new" class="nav-link">Создать команду</nuxt-link></b>
        </li>
      </ul>
      <nuxt-link to="/register" v-if="!$store.state.authUser" class="nav-link">Регистрация</nuxt-link>
      <nuxt-link to="/login" v-if="!$store.state.authUser" class="nav-link">Войти</nuxt-link>
      <nuxt-link to="/loginprovider" v-if="!$store.state.authUser" class="nav-link">Войти Google</nuxt-link>
      <button type="button" class="btn btn-link" v-if="$store.state.authUser" @click="logout">Выйти</button>
      <nuxt-link to="/my/auth/" v-if="$store.state.authUser" class="nav-link">{{ full_name }}</nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  
  computed: {
    full_name(){
      return this.$store.state.userProfile ? this.$store.state.userProfile.fullname : "Профиль" 
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        //localStorage.setItem('jwt', null)
        document.cookie = 'jwt=;max-age=0'
        document.cookie = 'profile_id=;max-age=0'
        
        document.location.reload(true);
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>