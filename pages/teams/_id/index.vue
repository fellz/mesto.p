<template>
  <div>
    <div class="team-wrapper">
      <div class="team_main">
        <div class="team_main_header">
          <div class="team_main_header_time text-muted">Создана: {{ team.created_at | formatDate }}</div>
        </div>
        <div class="team_main_name">
          <h4>{{  team.name }}</h4>
          <div>
            <nuxt-link
            v-if="managerFilter(team)"
            :to="'/teams/' + team.id+'/edit'"
            >Редактировать</nuxt-link>
          </div>
        </div>
        <p>{{ team.about }}</p>
      </div>
      <div class="team_aside">
        <div v-if="managerFilter(team)" class="team_aside_manage">
          <h4>Управление</h4>
          <hr/>
          <nuxt-link
            class="btn btn-primary team_aside_manage_edit_skills"
            :to="'/teams/'+team.id+'/requests'"
          >Заявки в команду</nuxt-link>
        </div>
        <h4>Участники команды</h4>
        <hr/>
        <div class="team_aside_team-flex">
          <div class="team_aside_team_owner">
            <div v-if="team.leader"
              class="team_aside_team_owner_photo"
              :src="thumb(team.leader)"
              :style="backimg(team.leader)">
            </div>
            <nuxt-link v-if="team.leader" :to="'/profiles/' + team.leader.id">{{ team.leader.fullname }}</nuxt-link>
          </div>
          <div v-for="p of team.participants" :key="p.id" class="team_aside_team-member">
            <div
                class="team_aside_team_photo"
                :src="thumb(p)"
                :style="backimg(p)"
              ></div>
              <nuxt-link :to="'/profiles/' + p.id">{{p.fullname}}</nuxt-link>
          </div>
        </div>
        <div v-if="sendReqFilter(team)" class="team_aside_skills" >
          <h4>Заявка в команду </h4>
          <hr/>
          <button class="btn btn-primary" @click="sendTeamReq(team)">Отправить</button>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from "axios";

export default {
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
    backimg(profile) {
      return `background-image: url(${this.url}${
        profile.avatar
          ? profile.avatar.formats.thumbnail.url
          : this.defAvatar
      })`;
    },
    thumb(profile){
      return this.url + (profile.avatar ? profile.avatar.formats.thumbnail.url : this.defAvatar)
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

<style>
.team-wrapper{
  display: flex;
}
.team_main{
  width: 60%;
  padding-right: 50px;
}
.team_main_header{
  display:flex;
  justify-content: space-between;
  margin-bottom:20px;
}
.team_main_header_status{
  padding:0 10px 0 10px;
  background-color: gray;
  color:white;
}
.team_main_name{
  display: flex;
}
.team_main_name div{
  margin-left: 30px;
}
.team_aside{
  width: 40%;
}
.team_aside_manage{
  margin-bottom:10px;
}
.team_aside_manage a{
  margin-right:5px;
}
.team_aside_team-flex {
  display: flex;
  flex-flow: wrap;
}
.team_aside_team-member, .team_aside_team_owner{
  margin-right: 10px;
}
.team_aside_team_photo, .team_aside_team_owner_photo {
  width: 70px;
  height: 70px;
  background-position: center;
  border-radius: 50%;
  margin: auto;
}
.team_aside_team_owner_photo{
  border: 2px solid red;
}
.team_aside_edit_skills{
  margin-left: 100px;
}
.team_edit_stage{
  float: right;
}
.team_aside_skills{
  margin-top: 20px;
}
</style>