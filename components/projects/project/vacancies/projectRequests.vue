<template>
<div>
  <div class="project_edit_skills-flex">
    <div class="project_edit_skills_requests">
      <div>Заявки</div>
      <hr/>
      <section v-for="req of proj_skill.requests" :key="req.id">
        <nuxt-link :to="'/profiles/'+req.id">{{req.fullname}}</nuxt-link>
        <button class="btn btn-primary" @click="joinProject(req.id)">Принять</button>
      </section>
    </div>
    <div class="project_edit_skills_filled">
      <div>Принятые</div>
      <hr/>
      <div v-for="conf of proj_skill.confirmeds" :key="conf.id">
        <nuxt-link :to="'/profiles/'+conf.id">{{conf.fullname}}</nuxt-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProjectRequests",
  props: {
    skill: Object
  },
  data(){
    return {
      proj_skill:{},
      baseUrl: process.env.baseUrl
    }
  },
  created(){
      this.getSkill()
  },
  methods:{
    // Забираем заявку
    async getSkill(){
      const { data } = await axios.get(`${process.env.baseUrl}/project-skills/${this.skill.id}`)
      this.proj_skill = data
    }, // Обработка заявки по вакансии
    async joinProject(id){
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      // Add to confirmeds
      const new_confs = [...this.proj_skill.confirmeds, id]
      const { data } = await axios.put(`${process.env.baseUrl}/project-skills/${this.skill.id}`,
      {confirmeds: new_confs},
      options)
      // Remove from requests
      const new_reqs = this.proj_skill.requests.filter( el => el.id !==  id )
      const { data:req } = await axios.put(`${process.env.baseUrl}/project-skills/${this.skill.id}`,
      {requests: new_reqs},
      options)
      // Update project. Add to project participants
      const ps = this.$store.state.project.participants
      const new_participants = [...ps, id]
      const { data:proj } = await axios.put(`${process.env.baseUrl}/projects/${this.$route.params.id}`,
      {participants: new_participants},
      options)
      // Update profile. Add to projects in Profile
      const prs = this.$store.state.userProfile.projects
      const prof_id = this.$store.state.userProfile.id
      const new_projects = [...prs, id]
      const { data:prof } = await axios.put(`${process.env.baseUrl}/profiles/${prof_id}`,
      {projects: new_projects},
      options)
      // Update project. Should update project in skills page.
      this.$store.dispatch("setProject",{id:this.$route.params.id})
      // Update skill
      this.getSkill();
    },
  }
}
</script>

<style>
.project_edit_skills-flex{
  display: flex;
}
.project_edit_skills_requests{
  margin-right: 20px;
}
..project_edit_skills_requests section{
  margin-bottom:10px;
}
</style>