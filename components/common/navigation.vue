<template>
  <div>
  <v-navigation-drawer v-model="drawer" expand-on-hover mini-variant app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Mesto platform
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list dense nav>
      
      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link to="/" >Главная</nuxt-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

        <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-ballot</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link to="/projects" >Проекты</nuxt-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link to="/profiles" >Участники</nuxt-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-account-switch</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link to="/teams" >Команды</nuxt-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-ballot-recount</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link to="/projects/auth/new" >Создать проект</nuxt-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>

  <v-app-bar dense app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Mesto platform</v-toolbar-title>
 
    <v-spacer></v-spacer>
    <span v-if="$store.state.userProfile">
      <nuxt-link  :to="'/profiles/' + $store.state.userProfile.id">
        <v-list-item-avatar color="grey darken-3">
          <!--<nuxt-link :to="'/profiles/' + p.id">   </nuxt-link>-->
          <v-img
            class="elevation-6"
            :src="url + avatar()"
          />
        </v-list-item-avatar>
      </nuxt-link>
    </span>

    <v-btn v-if="$store.state.authUser" class="mr-2" @click="logout" icon>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    
    <nuxt-link to="/login">
      <v-btn v-if="!$store.state.authUser" class="mr-2" icon>
          <v-icon>mdi-login</v-icon>
      </v-btn>
    </nuxt-link>
    
    <a :href="`${url}/connect/google`">
      <v-btn v-if="!$store.state.authUser" class="mr-2" icon>
          <v-icon>mdi-google</v-icon>
      </v-btn>
    </a>

  </v-app-bar>

 </div>
</template>

<script>
export default {
  name: "MestoNavigation",
  data: () => ({
    drawer: null,
    url: process.env.baseUrl,
    defAvatar: process.env.defAvatar
  }),
  props: {
    source: String,
    profile: Object
  },
  methods:{
    avatar(){
       return this.$store.state.userProfile.avatar ? this.$store.state.userProfile.avatar.formats.thumbnail.url : this.defAvatar
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
        //localStorage.setItem('jwt', null)
        document.cookie = 'jwt=;path=/;max-age=0'
        document.cookie = 'profile_id=;path=/;max-age=0'
        this.$router.replace('/goodbuy');
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
}
</script>