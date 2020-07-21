<template>
<div>
  <div>Заявки</div>
  <hr/>
  <div v-for="req of proj_skill.requests" :key="req.id">
    <nuxt-link :to="'/profiles/'+req.id">{{req.fullname}}</nuxt-link>
    <button class="btn btn-primary" @click="joinProject(req.id)">Принять</button>
  </div>
  <div>Принятые</div>
  <hr/>
  <div v-for="conf of proj_skill.confirmeds" :key="conf.id">
    <nuxt-link :to="'/profiles/'+conf.id">{{conf.fullname}}</nuxt-link>
  </div>
  <hr/>
  <button v-if="proj_skill.filled != true" class="btn btn-primary" @click="foundSkillClose">Закрыть </button>
  <button v-else class="btn btn-primary" @click="foundSkillOpen">
    Открыть
  </button>
</div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    skill: Object
  },
  data(){
    return {
      proj_skill:{},
    }
  },
  created(){
      this.getSkill()
  },
  methods:{
    async getSkill(){
      const { data } = await axios.get(`${process.env.baseUrl}/project-skills/${this.skill.id}`)
      this.proj_skill = data
    },
    async joinProject(id){
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      // // update confirmeds
      const new_confs = [...this.proj_skill.confirmeds, id]
      const { data } = await axios.put(`${process.env.baseUrl}/project-skills/${this.skill.id}`,
      {confirmeds: new_confs},
      options)
      // // update requests
      const new_reqs = this.proj_skill.requests.filter( el => el.id !==  id )
      const { data:req } = await axios.put(`${process.env.baseUrl}/project-skills/${this.skill.id}`,
      {requests: new_reqs},
      options)
      // add to participants
      const ps = this.$store.state.project.participants
      const new_participants = [...ps, id]
      const { data:proj } = await axios.put(`${process.env.baseUrl}/projects/${this.$route.params.id}`,
      {participants: new_participants},
      options)
      // add to projects in Profile
      const prs = this.$store.state.userProfile.projects
      const prof_id = this.$store.state.userProfile.id
      const new_projects = [...prs, id]
      const { data:prof } = await axios.put(`${process.env.baseUrl}/profiles/${prof_id}`,
      {projects: new_projects},
      options)
      this.$store.dispatch("setProject",{id:this.$route.params.id})
      this.getSkill();
    },
    async foundSkillClose(){
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const { data } = await axios.put(`${process.env.baseUrl}/project-skills/${this.skill.id}`,
        {filled: true},
        options)
      const { data:req } = await axios.put(`${process.env.baseUrl}/project-skills/${this.skill.id}`,
        {requests: []},
        options)
      this.getSkill();
    },
    async foundSkillOpen(){
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const { data } = await axios.put(`${process.env.baseUrl}/project-skills/${this.skill.id}`,
        { filled: false },
        options)
    }
  }
}
</script>