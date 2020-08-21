<template>
  <div>
  <v-navigation-drawer v-model="drawer" app>
    <v-list dense>
      
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
          <v-icon>mdi-email</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link to="/projects" >Проекты</nuxt-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-email</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link to="/profiles" >Участники</nuxt-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-email</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link to="/teams" >Команды</nuxt-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-action>
          <v-icon>mdi-email</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link to="/projects/auth/new" >Создать проект</nuxt-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>

  <v-app-bar  color="indigo" dark app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Mesto platform</v-toolbar-title>
  </v-app-bar>

 </div>
</template>

<script>
export default {
  name: "MestoNavigation",
  data: () => ({
    drawer: null,
  }),
  props: {
    source: String,
  },
}
</script>