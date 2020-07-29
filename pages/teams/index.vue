<template>
  <div>
    <div v-for="team of teams" :key="team.id">
      <div class="short_team--card">
        <div class="short_team--main">
          <div class="short_team--main--head">
            <h4><nuxt-link :to="`/teams/${team.id}`">{{ team.name }}</nuxt-link></h4>
            <div class="short_team--main--head--time text-muted">Создана: {{ team.created_at |  formatDate }}</div>
          </div>
          <div>{{ team.about }}</div>  
        </div>
        <aside class="short_team--aside">
          <h4>Участники</h4>
          <hr/>
          <div class="short_team--aside--participants">
            <div class="short_team--aside--participants--leader">
            <div v-if="team.leader"
              class="short_team--aside--participants_photo short_team--aside--participants--leader--photo"
              :src="thumb(team.leader)"
              :style="backimg(team.leader)">
            </div>
            <nuxt-link v-if="team.leader" :to="'/profiles/' + team.leader.id">{{ team.leader.fullname }}</nuxt-link>
          </div>
            <div class="short_team--aside--participant" v-for="p of team.participants" :key="p.id">
              <div
                class="short_team--aside--participants_photo"
                :src="url + (p.avatar ? p.avatar.formats.thumbnail.url : defAvatar)"
                :style="backimg(p)"
              ></div>
              <div>
                <nuxt-link :to="'/profiles/'+p.id">{{ p.fullname }}</nuxt-link>
              </div>
            </div>
          </div>
          <div class="short_team--aside--projects">
            <h5>Участвует в проектах</h5>
            <hr/>
            <span v-for="proj of team.projects" :key="proj.id">
              <nuxt-link :to="'/projects/'+proj.id">{{ proj.name }}</nuxt-link>
            </span>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//bug fix
// test project watching 
export default {
  data() {
    return {
      teams: [],
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar  
    }
  },
  methods: {
    backimg(profile) {
      return `background-image: url(${this.url}${
        profile.avatar !== null
          ? profile.avatar.formats.thumbnail.url
          : this.defAvatar
      })`;
    },
    thumb(profile){
      return this.url + (profile.avatar ? profile.avatar.formats.thumbnail.url : this.defAvatar)
    },
  },

  async fetch() {
    const { data } = await axios.get(`${this.url}/teams`);
    this.teams = data;
  }
};
</script>

<style >
.short_team--card {
    border-radius: 8px;
    border: 1px solid #d4cfcf;
    padding: 14px;
    margin-bottom: 10px;
    background-color: white;
    display:flex;
}
.short_team--main{
  width: 50%;
  margin-bottom: 10px;
  padding-right: 20px;
}
.short_team--main--head{
  display: flex;
  justify-content: space-between;
}
.short_team--aside{
  width: 50%;
}
.short_team--aside--participants{
  display:flex;
}
.short_team--aside--participant, .short_team--aside--participants--leader{
  margin-right: 10px;
}
.short_team--aside--participants--leader--photo{
  border: 2px solid red;
}
.short_team--aside--participants_photo {
  width: 70px;
  height: 70px;
  background-position: center;
  border-radius: 50%;
  margin: auto;
}
.short_team--aside--projects{
  margin-top: 10px;
}
</style>