<template>
    <v-card  class="mx-auto">
      <v-row>
        
        <v-col>
          <v-img width="200"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          />
        </v-col>
        
        <v-col cols="6">
          <v-card-title class="headline" >
            <nuxt-link :to="'/projects/' + project.id">
              {{project.name}}
            </nuxt-link>
          </v-card-title>
          <v-card-text>
            <v-clamp autoresize :max-lines="6">{{ project.description }}</v-clamp>
          </v-card-text>     
        </v-col>
        
        <v-col>
          <v-card-title>Команда</v-card-title>
          <nuxt-link :to="'/profiles/' + project.owner.id">
            <v-avatar size="50" style="border: 2px solid red" >
              <v-img
                class="elevation-6"
                :src="backimg(project.owner)"
              />
            </v-avatar>
            </nuxt-link>
          <span v-for="p in project.participants" :key="p.id">
            <nuxt-link :to="'/profiles/' + p.id">
            <v-list-item-avatar color="grey darken-3" >
              <v-img
                class="elevation-6"
                :src="backimg(p)"
              />
            </v-list-item-avatar>
            </nuxt-link>
          </span>
        </v-col>

      </v-row>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-action>Вакансии</v-list-item-action>
          <v-list-item-content>
            <v-chip-group >
              <v-chip v-for="v in project.vacancies" :key="v.id">
                {{v.name}}
              </v-chip>
            </v-chip-group>
          </v-list-item-content>
          
          <v-chip class="mr-2">{{ project.stage }}</v-chip>
          <span class="mr-2 ">{{ project.created_at | formatDate }}</span>

        </v-list-item>
      </v-card-actions>

    </v-card>
</template>

<script>
import VClamp from "vue-clamp";
import ProjectSkills from "~/components/projects/short_project/ProjectSkills.vue";

export default {
  name: "ShortProject",
  props: {
    project: Object
  },
  data(){
    return {
      profile:{},
      res:[],
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar
    }
  },
  components: {
    VClamp,
    ProjectSkills
  },
  methods:{
    backimg(profile) {
      return `${this.url}${
        profile.avatar
          ? profile.avatar.formats.thumbnail.url
          : this.defAvatar}`
    },
  }
};
</script>

<style>
.short_project{
  border-radius: 7px;
}
.aside__status{
  background-color: #f1eded;
}
</style>