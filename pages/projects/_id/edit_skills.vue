<template>
  <div>
    <div>
      <h4>Команда</h4>
      <div v-for="p of project.participants" :key="p.id">
        {{p.fullname}}
      </div>
    </div>
    <p><b>Вакансии</b></p>
    <div class="project_edit_skills_wrapper">
      <section class="card" v-for="s of project_skills" :key="s.id"> 
        <div class="card-body">
          <h5 class="card-title">{{s.name}}</h5>
            {{ s.pay === true ? "платим" : "волонтер" }}
            <hr/>
            <project-requests :skill="s"></project-requests>
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
      project: {}
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
.project_edit_skills_wrapper{
  display: flex;
}
.project_edit_skills_wrapper section {
  margin-right: 10px;
}
.project_edit_skills-form{
  width: 30%;
}
</style>