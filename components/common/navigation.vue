<template>
  <div>
  <v-navigation-drawer v-model="drawer" mini-variant app>
    <v-list-item>
      <v-list-item-content>
          Mesto platform
      </v-list-item-content>
    </v-list-item>
    <v-list dense nav>

      <v-list-item link nuxt to="/">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            Главная
        </v-list-item-content>
      </v-list-item>

        <v-list-item link nuxt to="/projects">
        <v-list-item-action>
          <v-icon>mdi-ballot</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            Проекты
        </v-list-item-content>
      </v-list-item>

      <v-list-item link nuxt to="/profiles">
        <v-list-item-action>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            Участники
        </v-list-item-content>
      </v-list-item>

      <v-list-item link nuxt to="/teams">
        <v-list-item-action>
          <v-icon>mdi-account-switch</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          Команды
        </v-list-item-content>
      </v-list-item>

      <v-list-item link nuxt to="/projects/auth/new">
        <v-list-item-action>
          <v-icon>mdi-ballot-recount</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          Создать проект
        </v-list-item-content>
      </v-list-item>

      <v-list-item link nuxt to="/teams/auth/new">
        <v-list-item-action>
          <v-icon>mdi-ballot-recount</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          Создать команду
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>

  <v-app-bar dense app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Mesto platform</v-toolbar-title>

    <v-spacer></v-spacer>
    <span v-if="!!$store.state.userProfile">
      <nuxt-link  :to="'/my/auth/'">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :src="avatar()"
          />
        </v-list-item-avatar>
      </nuxt-link>
    </span>

    <v-btn v-if="!!$store.state.authUser" class="mr-2" @click="logout" icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>

    <nuxt-link to="/login">
      <v-btn v-if="!$store.state.authUser" class="mr-2" icon>
          <v-icon>mdi-login</v-icon>
      </v-btn>
    </nuxt-link>

  </v-app-bar>

 </div>
</template>

<script>
export default {
  name: 'MestoNavigation',
  data: () => ({
    drawer: null,
    devUrl: process.env.baseUrl,
    defAvatar: process.env.defAvatar,
  }),
  props: {
    source: String,
    profile: Object,
  },
  methods: {
    avatar() {
      return `${this.devUrl}${
        this.$store.state.userProfile?.avatar?.length
          ? this.$store.state.userProfile.avatar[0].formats.thumbnail.url
          : this.defAvatar
      }`;
    },
    async logout() {
      try {
        await this.$store.dispatch('logout');
        document.cookie = 'jwt=;path=/;max-age=0';
        document.cookie = 'profile_id=;path=/;max-age=0';
        this.$router.replace('/goodbuy');
      } catch (e) {
        this.formError = e.message;
      }
    },
  },
};
</script>
