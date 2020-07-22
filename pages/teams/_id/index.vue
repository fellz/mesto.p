<template>
  <div>
    <div class="team_wrapper">
      <div class="team_head">
        <div>
          <span class="team_head-name">
            <nuxt-link :to="`/teams/${team.id}`">{{ team.name }}</nuxt-link>
          </span>
          <span>by {{ team.leader ? team.leader.fullname : "" }}</span>
        </div>
        <nuxt-link v-if="$store.state.authUser && isOwner(team)" :to="'/teams/' + team.id + '/requests'">Заявки</nuxt-link>
      </div>
      <hr />
      <div class="team_main">
        <div class="team_main_first">{{team.about}}</div>
        <div>
          <div v-for="p of team.participants" :key="p.id">
            <nuxt-link :to="'/profiles/'+p.id">{{p.fullname}}</nuxt-link>
          </div>
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
      url: process.env.baseUrl
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
    }
  }
};
</script>

<style>
.team_wrapper {
  border: 1px solid black;
  padding: 10px;
  border-radius: 7px;
}
.team_main {
  display: flex;
  justify-content: space-between;
}
.team_main_first {
  margin-right: 10px;
  width: 61%;
}
.team_head {
  display: flex;
  justify-content: space-between;
}
.team_head-name{
  font-size: 20px;
}
</style>