<template>
  <div v-if="managerFilter(project)">
    <h4>Заявки </h4>
    <hr/>
    <div v-for="req of project.team_requests" :key="req.id">
      {{ req.name }}
      <button class="btn btn-primary" @click="joinProject(req)">Принять</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "TeamRequestsManager",
  data(){
    return {
      project: {},
      url: process.env.baseUrl
    }
  },
  async fetch(){
    await this.getProject()
  },
  methods:{
    managerFilter(project){
      return this.$store.state.authUser && this.isOwner(project)
    },
    isOwner(project){
      let owner = false;
      // need to check for null  project.owner !!! ((
      if(project.owner){
        owner = project.owner.id === this.$store.state.userProfile.id;  
      }
      return owner
    },
    async getProject(){
      this.project = await this.$axios.$get(`/projects/${this.$route.params.id}`)
    },
    async joinProject(team){
      const new_ts = [...this.project.teams, team.id];
      //update participants
      const data  = await this.$axios.$put(`/projects/${this.project.id}`,
        { teams: new_ts }
      );
      // update requests, delete team from requests
      const new_reqs =  this.project.team_requests.filter(t => t.id !== team.id)
      const req = await this.$axios.$put(`/projects/${this.project.id}`,
        { team_requests: new_reqs }
      );
      this.getProject()
    }
  }
}
</script>