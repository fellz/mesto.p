<template>
  <div>
    <div class="project--edit_skills--wrapper">
      <div class="project--edit_skills--vacancies">
        <h4>
          <nuxt-link :to="'/projects/' + project.id" 
          class="project_edit_skills_teamname">{{ project.name }}
          </nuxt-link>
        </h4>
        <hr/>
        <h5> Вакансии </h5>
        <div class="project--edit_skills--vacancy">
          <section  v-for="s of project_skills" :key="s.id"> 
            <div class="project--edit_skills--vacancies--flex">
              <div>
                <h5 class="card-title">{{s.name}}</h5>
                {{ s.pay === true ? "платим" : "волонтер" }}
                <hr/>
                <div>
                  <button v-if="s.filled != true" class="btn btn-primary" @click="foundSkillClose(s)">Закрыть </button>
                  <button v-else class="btn btn-primary" @click="foundSkillOpen(s)">
                    Открыть
                  </button>
                </div>
              </div>
              <div>
                <project-requests :skill="s"></project-requests>
              </div>
            </div>
          </section>
        </div>
        <hr/>
      </div>
      <div class="project--edit_skills--participants">
        <form @submit.prevent="addSkill" method="post" class="project_edit_skills-form"> 
          <p><b>Кто нужен в проект:</b></p>
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
        <h5>Команда проекта</h5>
        <hr/>
        <participants :owner_profile="project.owner" :resource="project" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProjectRequests from "~/components/ProjectRequests";
import Participants from "~/components/participants/index.vue";

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
.project--edit_skills--wrapper{
  display: flex;
}
.project--edit_skills--vacancies{
  width: 70%;
  padding-right: 20px;
}
.project--edit_skills--vacancies--flex{
  display: flex;
  justify-content: space-between;
}
.project--edit_skills--vacancies section{
  background-color: white;
  padding: 10px;
  margin-bottom: 20px;
}
.project_edit_skills-form{
  margin-bottom: 15px;
}
</style>