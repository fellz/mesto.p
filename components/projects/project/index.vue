  <template>
    <v-card style="margin-bottom:20px" max-width="900">
    <v-row>
      
      <v-col sm="8">
        
        <v-img height="120"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        >
        </v-img>

        <v-card-text>
           <v-row align="end" class="pa-3  fill-height" >
            <h2>
              {{project.name}}
            </h2>
          </v-row>
          {{ project.description }}
        </v-card-text>

      </v-col>
      
      <v-col>
        <v-row justify="end" no-gutters class="mr-2">
          <v-col cols="6" class="white--text" style="background-color:gray; text-align: center">{{ project.stage }}</v-col>
          <v-col style="text-align: end">{{ project.created_at | formatDate }}</v-col>
        </v-row>
        <v-card-title>Команда</v-card-title>
        <participants :resource="project" :owner_profile="project.owner" />
        <!-- vacancies -->
        <v-card-title>Вакансии</v-card-title>
        <span v-for="vac in project.vacancies" :key="vac.id">
          <v-chip v-if="!vac.filled" class="mr-2 mb-2" >
            {{vac.name}}
          </v-chip>
         </span>
        <v-spacer></v-spacer>
        <!-- management -->
        <div v-if="managerFilter(project)">
        <v-card-title>Управление </v-card-title>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-btn
              color="primary"
              nuxt
              :to="`/projects/${project.id}/auth/edit`"
            >
              Изменить
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="primary"
              nuxt
              :to="`/projects/${project.id}/auth/vacancies/`"
            >
              Вакансии
            </v-btn>
          </v-col>
        </v-row>
        </div>
      </v-col>

    </v-row>
    </v-card>
</template>

<script>
//import RequestFromTeamButton from "~/components/projects/project/service/requestFromTeamButton.vue";
import Participants from "~/components/common/participants.vue";

export default {
  name: "Project",
  // components:{
  //   JoinProjectButton,
  //   RequestFromTeamButton,
  //   Participants
  // },
  components:{
    Participants
  },
  data(){
    return {
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
      project: {owner:{avatar: ''}}
    }
  },
  async created() {
      await this.getProject();
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
      let manager = false
      if (project.owner){
        manager = this.$store.state.authUser && this.isOwner(project)
      }
      return manager  
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