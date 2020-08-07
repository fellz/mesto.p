<template>
  <div>
    <h4>
      <nuxt-link :to="'/projects/' + project.id">{{ project.name }}</nuxt-link>
    </h4>
    <hr/>
    <div class="row">
      <main class="col-sm-6">
        <h5> Вакансии </h5>
        <main class="project_edit_skills__main">
          <section class="main__vacancy"  v-for="s of project.project_skills" :key="s.id"> 
            <header class="row vacancy__header">
              <h5 class="col-sm-4">{{s.name}}</h5> 
              <div class="col-sm-4 text-left"><span class="header__pay">{{ s.pay === true ? "платим" : "волонтер" }}</span></div>
              <div class="col-sm-4 text-right">
                <button v-if="s.filled != true" class="btn btn-primary" @click="foundSkillClose(s)">Закрыть </button>
                <button v-else class="btn btn-primary" @click="foundSkillOpen(s)">Открыть </button>
              </div>  
            </header>
            <hr/>
            <div>
              <project-requests :skill="s"></project-requests>
            </div>
          </section>
        </main>
      </main>
      <aside>
        <section>
          <form @submit.prevent="addSkill" method="post"> 
            <h5>Кто нужен в проект:</h5>
            <hr/>
            <label>Платим?</label>
            <input type="checkbox" v-model="pay" />
            <p>
              <select v-model="selected" @change="itemSelected" class="custom-select">
                <option disabled value="">Выберите скилл</option>
                <option v-for="skill of skills" :key="skill.id" :value="skill.id">{{skill.skill}}</option>
              </select>
            </p>
            <input type="submit" class="btn btn-primary" value="Добавить" />
          </form>
        </section>
        <section>
          <h5>Команда проекта</h5>
          <hr/>
          <participants :owner_profile="project.owner" :resource="project" />
        </section>
      </aside>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
  created(){
    this.getSkills()
    this.getProject();
  },
  methods:{
    async getSkills(){
      const { data } = await axios.get(`${this.url}/skills`);
      this.skills = data;
    },
    async getProject(){
      const { data } = await axios.get(`${this.url}/projects/${this.$route.params.id}`);
      this.project = data;
    },
     async skillClose(skill){
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const { data } = await axios.put(`${this.url}/project-skills/${skill.id}`,
        {filled: true, requests: []},
        options)
      this.getSkills();
    },
    async skillOpen(skill){
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const { data } = await axios.put(`${this.url}/project-skills/${skill.id}`,
        { filled: false },
        options)
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
        skill: this.selected,
        project: parseInt(this.$route.params.id, 10),
      };
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      
      const { data } = await axios.post(
        `${process.env.baseUrl}/project-skills/`,
        proj,
        options
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