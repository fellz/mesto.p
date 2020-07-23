<template>
  <div>
    <div v-for="team of teams" :key="team.id">
      <div class="short_team_card">
        <div class="short_team_card_head">
        <div>
          <span class="short_team_head-name">
            <nuxt-link :to="`/teams/${team.id}`">{{ team.name }}</nuxt-link>
          </span>
          <span>by <nuxt-link :to="`/profiles/${team.leader.id}`">{{ team.leader.fullname }}</nuxt-link></span>
        </div>
          <button v-if="$store.state.authUser && !isOwner(team) && inTeamRequests(team)" class="btn btn-primary" @click="joinTeam(team)">Заявка</button>
        </div>
        <hr />
        <div>{{ team.about }}</div>
        <hr />
        <div class="short_team_ps">
          <div class="short_team_ps-margin" v-for="p of team.participants" :key="p.id">
            <div
              class="short_team_ps_photo"
              :src="url + p.avatar ? p.avatar.formats.thumbnail.url : defAvatar"
              :style="backimg(p)"
            ></div>
            <div>
              <nuxt-link :to="'/profiles/'+p.id">{{ p.fullname }}</nuxt-link>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <span>Проекты:</span>
          <span v-for="proj of team.projects" :key="proj.id">
            <nuxt-link :to="'/projects/'+proj.id">{{ proj.name }}</nuxt-link>
          </span>
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
      teams: []
    };
  },
  computed: {
    url() {
      return process.env.baseUrl;
    },
    defAvatar: process.env.defAvatar
  },
  methods: {
    backimg(profile) {
      return `background-image: url(${this.url}${
        profile.avatar !== null
          ? profile.avatar.formats.thumbnail.url
          : process.env.defAvatar
      })`;
    },
    isOwner(team) {
      return team.leader.id === this.$store.state.authUser.user.profile.id;
    },
    inTeamRequests(team) {
        let t = true;
        if (this.$store.state.userProfile != null){
          // check requests
          const reqs = this.$store.state.userProfile.team_requests
          const prof_id = this.$store.state.userProfile.id
          const reqs_arr = reqs.map(a => a.id)
          const team_found = reqs_arr.some(s => s === team.id)
          if( team_found){
            t = false;
          }
        }
      return t;
    },
    async joinTeam(team) {
       const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const prof_id = this.$store.state.userProfile.id;
      const new_reqs = [...team.requests, prof_id];
      const { data } = await axios.put(
        `${this.url}/teams/${team.id}`,
        { requests: new_reqs },
        options
      );
      this.$store.dispatch("getProfile")
    }
    
  },

  async fetch() {
    const { data } = await axios.get(`${this.url}/teams`);
    this.teams = data;
  }
};
</script>

<style >
.short_team_card {
  border-radius: 8px;
  border: 1px solid black;
  padding: 5px;
  margin-bottom: 10px;
}
.short_team_card_head {
  display: flex;
  justify-content: space-between;
}
.short_team_ps {
  display: flex;
}
.short_team_ps-margin {
  margin: auto;
}
.short_team_ps_photo {
  margin-right: 10px;
  width: 70px;
  height: 70px;
  background-position: center;
  border-radius: 50%;
  margin: auto;
}
.short_team_head-name{
  font-size: 20px;
}
</style>