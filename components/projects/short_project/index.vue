<template>
  <v-card style="margin-bottom:20px" max-width="900">
    <v-row>
      
      <v-col cols="8">
        
        <v-img height="150"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        >
        <v-row align="end" class="ml-4 fill-height">
          <h1 class="px-2" style="background-color: rgba(74, 70, 70, 0.82);">
            <nuxt-link 
              :to="'/projects/' + project.id" 
              style="color:white;" >
              {{project.name}}
            </nuxt-link>
          </h1>
        </v-row>
    
        </v-img>

        <v-card-text>
          <v-clamp autoresize :max-lines="6">{{ project.description }}</v-clamp>
        </v-card-text>

      </v-col>
      
      <v-col>
        <v-row justify="end" no-gutters class="mr-2">
          <v-col cols="6" class="white--text" style="background-color:gray; text-align: center">{{ project.stage }}</v-col>
          <v-col style="text-align: end">{{ project.created_at | formatDate }}</v-col>
        </v-row>

        <v-card-title>Команда</v-card-title>
        <!-- Owner avatar -->
        <nuxt-link :to="'/profiles/' + project.owner.id">
          <v-avatar size="70" style="border: 2px solid red" >
            <v-img
              class="elevation-6"
              :src="backimg(project.owner)"
            />
          </v-avatar>
        </nuxt-link>
        <!-- other members -->
        <span v-for="p in project.participants" :key="p.id">
          <nuxt-link :to="'/profiles/' + p.id" >
            <v-avatar size="60">
              <v-img
                class="elevation-6"
                :src="backimg(p)"
              />
            </v-avatar>
          </nuxt-link>
        </span>
        
        <!-- vacancies -->
        <v-card-title>Вакансии</v-card-title>
        <v-chip v-for="vac in project.vacancies" :key="vac.id">
          <join-project-button :project="project" :skill="vac" />{{vac.name}}
        </v-chip>

      </v-col>

    </v-row>

    </v-card>
</template>

<script>
import VClamp from "vue-clamp";
import ProjectSkills from "~/components/projects/short_project/ProjectSkills.vue";
import JoinProjectButton from "~/components/projects/project/service/joinProjectButton.vue";

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
    ProjectSkills,
    JoinProjectButton
  },
  methods:{
    backimg(profile) {
      return `${this.url}${
        profile.avatar
          ? profile.avatar.formats.thumbnail.url
          : this.defAvatar}`
    },
    applyToVacancy(v){

    }
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