<template>
  <div>
    <div v-for="team of teams" :key="team.id">
      <div class="short_team_card">
        <h5>
          <nuxt-link :to="`/teams/${team.id}`">
            {{ team.name }}
          </nuxt-link>
        </h5>
        <hr />
        <div class="short_team_ps">
          <div class="short_team_ps-margin" v-for="p of team.participants" :key="p.id">
            <div class="short_team_ps_photo" :src= "url + p.avatar.formats.thumbnail.url" :style="backimg(p)" ></div>
            <div><nuxt-link :to="'/profiles/'+p.id">{{ p.fullname }}</nuxt-link></div>
          </div>
        </div>
        <hr>
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
import axios from "axios"

export default {
  data(){
    return {
      teams: [],
      
    }
  },
  computed:{
    url(){
      return process.env.baseUrl
    },
  },
  methods: {
    backimg(profile) {
        return (
          `background-image: url(${this.url}${
            profile.avatar
            ?  profile.avatar.formats.thumbnail.url
            : process.env.defAvatar
        })`)
      },
  },
  async fetch(){
    const { data } = await axios.get(`${this.url}/teams`)
    this.teams = data
  }
}
</script>

<style >
.short_team_card{
  width: 400px;
  border-radius: 8px;
  border: 1px solid black;
  padding: 5px;
  margin-bottom: 10px;
}
.short_team_ps{
  display:flex;
}
.short_team_ps-margin{
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
</style>