<template>
  <div  v-if="managerFilter(team)">
    <h4>Заявки </h4>
    <div v-if="team.requests.length > 0">
      <div v-for="req of team.requests" :key="req.id">
        {{ req.fullname }}
        <button class="btn btn-primary" @click="joinTeam(req)">Принять</button>
      </div>
    </div>
    <div v-else>Пока ничего нет...</div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      team: {},
      url: process.env.baseUrl
    }
  },
  async fetch(){
    await this.getTeam()
  },
  methods:{
    managerFilter(team){
      return this.$store.state.authUser && this.isOwner(team)
    },
    isOwner(team){
      let owner = false;
      // because team is reactive and team.leader could be undefined --> need to check for null !!! ((
      if(team.leader){
        owner = team.leader.id === this.$store.state.userProfile.id;  
      }
      return owner
    },
    async getTeam(){
      this.team = await this.$axios.$get(`/teams/${this.$route.params.id}`)
    },
    async joinTeam(profile){
      const new_ps = [...this.team.participants, profile.id];
      //update participants
      const resp = await this.$axios.$put(`/teams/${this.team.id}`,
        { participants: new_ps }
      );
      // update requests, delete profile from requests
      const new_reqs =  this.team.requests.filter(p => p.id !== profile.id)
      const req = await this.$axios.$put(`/teams/${this.team.id}`,
        { requests: new_reqs }
      );
      this.getTeam()
    }
  }
}
</script>