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
import axios from "axios";

export default {
  data(){
    return {
      team: {},
      url: process.env.baseUrl
    }
  },
  async fetch(){
    this.getTeam()
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
      const { data } = await axios.get(`${this.url}/teams/${this.$route.params.id}`)
      this.team = data
    },
    async joinTeam(profile){
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const new_ps = [...this.team.participants, profile.id];
      //update participants
      const { data } = await axios.put(
        `${this.url}/teams/${this.team.id}`,
        { participants: new_ps },
        options
      );
      // update requests, delete profile from requests
      const new_reqs =  this.team.requests.filter(p => p.id !== profile.id)
      const { data: req } = await axios.put(
        `${this.url}/teams/${this.team.id}`,
        { requests: new_reqs },
        options
      );
      this.getTeam()
    }
  }
}
</script>