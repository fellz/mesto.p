<template>
  <div>
    <div class="row">
      <main class="col-sm-6">
        <h4>
          <nuxt-link :to="'/projects/' + project.id">{{ project.name }}</nuxt-link>
        </h4>
        <hr/>
        <h5> Вакансии </h5>
        <main class="project_edit_skills_main">
          <section class="main__vacancy"  v-for="s of project_skills" :key="s.id"> 
            <header class="row vacancy__header">
              <h5 class="col-sm-4">{{s.name}}</h5>
              <div class="col-sm-4 text-left header__pay">{{ s.pay === true ? "платим" : "волонтер" }}</div>
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
      <aside class="project--edit_skills--participants">
        <section>
          <form @submit.prevent="addSkill" method="post"> 
            <h5>Кто нужен в проект:</h5>
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
import ProjectRequests from "~/components/projects/ProjectRequests";
import Participants from "~/components/common/participants.vue";

export default {
  data(){
    return {
      selected: "",
      name: "",
      skills: [],
      pay: null,
      project_skills: [],
      project: {},
      url: process.env.baseUrl
    }
  },
  components:{
    ProjectRequests,
    Participants
  },
  middleware: ["auth"],
  async fetch(){
    const { data } = await axios.get(`${process.env.baseUrl}/skills`);
    this.skills = data;
    this.$store.dispatch("setProject", {id:this.$route.params.id})
    this.getSkills();
  },
  methods:{
     async foundSkillClose(skill){
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const { data } = await axios.put(`${this.url}/project-skills/${skill.id}`,
        {filled: true},
        options)
      const { data:req } = await axios.put(`${this.url}/project-skills/${skill.id}`,
        {requests: []},
        options)
      this.getSkills();
    },
    async foundSkillOpen(skill){
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const { data } = await axios.put(`${process.env.baseUrl}/project-skills/${skill.id}`,
        { filled: false },
        options)
      this.getSkills();
    },
    itemSelected(){
      const sk = this.skills.find(s => this.selected === s.id)
      this.name = sk.skill
    },
    async getSkills(){
    const { data:project } = await axios.get(`${process.env.baseUrl}/projects/${this.$route.params.id}`);
      this.project_skills = project.project_skills;
      this.project = project
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
      this.getSkills()
    }
  },
  watch: {
    "$store.state.project": function(){
      this.project = this.$store.state.project
    }
  }
}
</script>

<style>
.project_edit_skills_main{
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
}
.header__pay{
  background-color:  #ebebeb;
}

</style>