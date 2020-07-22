<template>
  <div>
    <h4>Заявки </h4>
    <div v-for="req of project.team_requests" :key="req.id">
      {{ req.name }}
      <button class="btn btn-primary" @click="joinProject(req)">Принять</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      project: {},
      url: process.env.baseUrl
    }
  },
  async fetch(){
    this.getProject()
  },
  methods:{
    async getProject(){
      const { data } = await axios.get(`${this.url}/projects/${this.$route.params.id}`)
      this.project = data
    },
    async joinProject(team){
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const new_ts = [...this.project.teams, team.id];
      //update participants
      const { data } = await axios.put(
        `${this.url}/projects/${this.project.id}`,
        { teams: new_ts },
        options
      );
      // update requests, delete team from requests
      const new_reqs =  this.project.team_requests.filter(t => t.id !== team.id)
      const { data: req } = await axios.put(
        `${this.url}/projects/${this.project.id}`,
        { team_requests: new_reqs },
        options
      );
      this.getProject()
    }
  }
}
</script>