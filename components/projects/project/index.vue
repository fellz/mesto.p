  <template>
    <v-card style="margin-bottom:20px" max-width="900">
    <v-row>
      
      <v-col sm="8">
        
        <v-img height="150"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        >
          <v-row align="end" class="ml-4 white--text fill-height" >
            <h1 class="px-1" style="background-color: rgba(74, 70, 70, 0.82);">
              {{project.name}}
            </h1>
          </v-row>
            
        </v-img>

        <v-card-text>
          {{ project.description }}
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
          <nuxt-link :to="`/profiles/${p.id}`" >
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
        <v-chip v-for="v in project.vacancies" :key="v.id">
          {{v.name}}
        </v-chip>

      </v-col>

    </v-row>
    </v-card>
</template>

<script>
//import JoinProjectButton from "~/components/projects/project/service/joinProjectButton.vue";
//import RequestFromTeamButton from "~/components/projects/project/service/requestFromTeamButton.vue";
//import Participants from "~/components/common/participants.vue";

export default {
  name: "Project",
  // components:{
  //   JoinProjectButton,
  //   RequestFromTeamButton,
  //   Participants
  // },
  data(){
    return {
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
      project: {owner:{}}
    }
  },
  created() {
      this.getProject();
  },
  methods: {
    backimg(profile) {
      return `${this.url}${
        profile.avatar
          ? profile.avatar.formats.thumbnail.url
          : this.defAvatar}`
    },
    async getProject(){
      this.project = await this.$axios.$get(`/projects/${this.$route.params.id}`);
    },
    isOwner(project) {
      return project.owner.id === this.$store.state.userProfile.id; 
    },
    managerFilter(project){
      if (project.owner){
        return this.$store.state.authUser && this.isOwner(project)
      }
      return false  
    },
  } 
};
</script>

<style>
  .project{
    background-color: #efefef;
    border-radius: 10px;
  }
    .teams__dropdown_pointer{
      cursor: pointer;
    }
  .project__aside{
    border-radius: 7px;
  }
</style>