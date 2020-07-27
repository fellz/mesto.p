<template>
  <div>
    <div class="team-wrapper">
      <div class="team_main">
        <div class="team_main_header">
          <div class="team_main_header_time text-muted">Создана: {{ team.created_at | formatDate }}</div>
        </div>
        <h4>{{  team.name }}</h4>
        <p>{{ team.about }}</p>
      </div>
      <div class="team_aside">
        <div v-if="$store.state.authUser && isOwner(team)" class="team_aside_manage">
          <h4>Управление</h4>
          <hr/>
          <nuxt-link
            class="btn btn-primary team_aside_manage_edit"
            :to="'/teams/' + team.id+'/edit'"
          >Редактировать</nuxt-link>
          <nuxt-link
            class="btn btn-primary team_aside_manage_edit_skills"
            :to="'/teams/requests'"
          >Заявки</nuxt-link>
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
        <div class="team_aside_skills">
          <h4>Заявка в команду </h4>
          <hr/>
          
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
  async fetch() {
    const { data } = await axios.get(`${this.url}/teams/${this.$route.params.id}`);
    this.team = data;
  },
  methods: {
    isOwner(team){
      let own = false;
      // because team is reactive need to check for null !!! ((
      if(team.leader){
        own = team.leader.id === this.$store.state.authUser.user.profile.id;  
      }
      return own
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