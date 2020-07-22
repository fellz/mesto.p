<template>
  <div>
    <div>
      <span class="project_edit_skills_teamname">Команда проекта</span>
      <nuxt-link :to="'/projects/' + project.id">{{ project.name }}</nuxt-link>
      <hr/>
      <div v-for="p of project.participants" :key="p.id">
        <nuxt-link :to="'/profiles/' + p.id">{{p.fullname}}</nuxt-link>
      </div>
    </div>
    
    <p><b>Вакансии</b></p>
    <div class="profile_edit_card_custom">
      <section class="card" v-for="s of project_skills" :key="s.id"> 
        <div class="card-body profile_edit_card_body_custom">
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
  </div>
</template>

<script>
import axios from "axios";
import ProjectRequests from "~/components/ProjectRequests";
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
    ProjectRequests
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
.project_edit_skills_teamname{
  font-size: 22px;
  margin-right: 20px;
}
.profile_edit_card_custom section{
  margin-bottom: 20px;
}
.profile_edit_card_body_custom{
  display: flex;
  justify-content: space-between;
}
.project_edit_skills-form{
  width: 30%;
}
</style>