<template>
  <div>
    <div class="row team">
      <main class="col-sm-6">
        <header>
          <div class="text-muted">Создана: {{ team.created_at | formatDate }}</div>
        </header>
        <section class="team_main_name">
          <h4>{{  team.name }}</h4>
          <div>
            <nuxt-link
            v-if="managerFilter(team)"
            :to="'/teams/' + team.id+'/edit'"
            >Редактировать</nuxt-link>
          </div>
        </section>
        <p>{{ team.about }}</p>
      </main>
      <aside class="col-sm-6">
        <section v-if="managerFilter(team)">
          <h4>Управление</h4>
          <hr/>
          <nuxt-link
            class="btn btn-primary team_aside_manage_edit_skills"
            :to="'/teams/'+team.id+'/requests'"
          >Заявки в команду</nuxt-link>
        </section>
        <h4>Участники команды</h4>
        <hr/>
        <!-- Component --> 
        <participants :owner_profile="team.leader" :resource="team" />
        <section v-if="sendReqFilter(team)" class="team_aside_skills" >
          <h4>Заявка в команду </h4>
          <hr/>
          <button class="btn btn-primary" @click="sendTeamReq(team)">Отправить</button>
        </section>
      </aside>
    </div> 
  </div>
</template>

<script>
import axios from "axios";
import Participants from "~/components/common/participants.vue";

export default {
  components:{
    Participants
  },
  data() {
    return {
      team: {},
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar
    };
  },
  fetch() {
    this.getTeam()
  },
  methods: {
    async getTeam(){
      const { data } = await axios.get(`${this.url}/teams/${this.$route.params.id}`);
      this.team = data;
    },
    managerFilter(team){
      return this.$store.state.authUser && this.isOwner(team)
    },
    sendReqFilter(team){
      return (
        this.$store.state.authUser &&
        !this.isOwner(team) &&
        !this.inTeam(team.participants) &&
        !this.inTeam(team.requests)
      )
    },
    inTeam(participants){
      //participants could be undefined 
      let found = false;
      const p_id = this.$store.state.userProfile.id
      if(participants){
        participants.some( p => p.id === p_id )
        ? found = true
        : found
      }
      return found
    },
    isOwner(team){
      let owner = false;
      // because team is reactive and team.leader could be undefined --> need to check for null !!! ((
      if(team.leader){
        owner = team.leader.id === this.$store.state.userProfile.id;  
      }
      return owner
    },
    async sendTeamReq(team){
       const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const profile = this.$store.state.userProfile.id
      const new_reqs = [...team.requests, profile]
      const { data } = await axios.put(`${this.url}/teams/${team.id}`,
      {requests: new_reqs},
      options)
      this.getTeam()
    }
  }
};
</script>
