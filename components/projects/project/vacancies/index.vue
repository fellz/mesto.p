<template>
  <div>
    <v-row >
      
      <v-col cols="6">
        
        <v-card  class="mb-4">
          <v-card-title>
            <div class="text-h5">Кто нужен в проект<v-divider /></div>
          </v-card-title>
          <v-form @submit.prevent="addSkill">
            <v-container fluid>
              <v-row style="background-color: #f4f4f4;" align="center">
                <v-col class="d-flex" cols="12" md="6">
                  <v-checkbox v-model="pay" label="Платим ?"></v-checkbox>
                </v-col>
                <v-col class="d-flex" cols="12" md="6">
                  <v-select
                    v-model="selected"
                    :items="skills"
                    label="Выберите навык"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn type="submit">Добавить</v-btn>
            </v-card-actions>  
          </v-form>
        </v-card>
        
        <div class="text-h5 mb-3">Команда проекта</div>
        <v-divider class="mb-3" />
        <participants :owner_profile="project.owner" :resource="project" />

      </v-col>
  
      <v-col>
        <div class="text-h5">Вакансии </div>
        <v-divider class="mb-3" />
        <v-card class="mb-3" v-for="s of project.vacancies" :key="s.id">
          <v-row >
            <v-col>
                <v-list>
                  <v-list-item><v-chip>{{s.name}}</v-chip></v-list-item>
                  <v-list-item><v-chip color="primary">{{ s.pay === true ? "платим" : "волонтер" }}</v-chip></v-list-item>
                  <v-list-item>
                    <v-btn v-if="s.filled != true" @click="foundSkillClose(s)">Закрыть</v-btn>
                    <v-btn v-else @click="foundSkillOpen(s)">Открыть</v-btn>
                  </v-list-item>
                </v-list>
            </v-col>
            <v-col>
              <project-requests :skill="s"></project-requests>        
            </v-col>
          </v-row>
        </v-card>
          
      </v-col>

    </v-row>
    
  </div>
</template>

<script>
import ProjectRequests from "~/components/projects/project/vacancies/projectRequests";
import Participants from "~/components/common/participants.vue";

export default {
  name: "ProjectSkills",
  data(){
    return {
      selected: "",
      name: "",
      skills: [],
      pay: null,
      project: {},
      url: process.env.baseUrl
    }
  },
  components:{
    ProjectRequests,
    Participants
  },
  async created(){
    await this.getSkills()
    await this.getProject();
  },
  methods:{
    async getSkills(){
      const resp = await this.$axios.$get(`/skills`);
      this.skills = resp.map( (r) => (r.skill))
    },
    async getProject(){
      this.project = await this.$axios.$get(`/projects/${this.$route.params.id}`);
      console.log('Project', this.project.project_skills)
    },
     async skillClose(skill){
      const resp = await this.$axios.$put(`/project-skills/${skill.id}`,
        {filled: true, requests: []},
      )
      this.getSkills();
    },
    async skillOpen(skill){
      const resp = await this.$axios.$put(`/project-skills/${skill.id}`,
        { filled: false },
      )
      this.getSkills();
    },
    itemSelected(){
      const sk = this.skills.find(s => this.selected === s.id)
      this.name = sk.skill
    },
    async addSkill() {
      let proj = {
        pay: this.pay,
        name: this.name,
        name: this.selected,
        project: parseInt(this.$route.params.id, 10),
      };
      const resp = await this.$axios.$post(`/project-skills/`,
        proj,
      );
      this.pay = null
      this.name = ""
      this.selected = ""

      this.getProject()
    }
  }
}
</script>

<style>
.main__vacancy{
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
}
.header__pay{
  background-color:  #ebebeb;
}
</style>