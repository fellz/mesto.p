<template>
  <div id="toplevel">
    <v-app>
      <mesto-navigation />

      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid class="fill-height" >
          <v-row justify="center">
            <v-col sm="11" >
              <nuxt class="nuxt" />
            </v-col>
          </v-row>
        </v-container>
      </v-main>

    </v-app>
  </div>
</template>

<script>
import MestoNavigation from '~/components/common/navigation.vue';

export default {
  components: {
    MestoNavigation,
  },
  async created() {
    // preserve session if jwt in cookies exists
    if (process.client) {
      const jwt = this.getCookie('jwt');
      const profileId = this.getCookie('profile_id');
      const token = {};
      if (jwt && profileId) {
        const profile = await this.$axios.$get(`/profiles/${profileId}`);
        token.jwt = jwt;
        this.$axios.setToken(jwt, 'Bearer', ['put', 'post', 'delete']);
        this.$store.commit('SET_USER', token);
        this.$store.commit('SET_USER_PROFILE', profile);
      }
    }
  },
  methods: {
    getCookie(name) {
      const matches = document.cookie.match(new RegExp(
        // eslint-disable-next-line no-useless-escape
        `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    },
  },

};
</script>
<style>
html {
  font-family: "Source Sans Pro",
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  font-family: "Montserrat", sans-serif ;
}
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

/* Custom css */

@media (min-width: 1200px) {
  .container{
      max-width: 1120px;
  }
}
section{
  margin: 20px 0;
}
.nuxt{
  padding-top:10px;
  padding-bottom: 50px;

}
.nuxt-wrapper{
  background-color:  #e3e3e3;
}
.mesto_card{
  background-color: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
