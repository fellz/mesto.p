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
          <participants :owner_profile="team.leader" :resource="team" />
          
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
import Participants from "~/components/participants/index.vue";

export default {
   components:{
    Participants
  },
  data() {
    return {
      teams: [],
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar  
    }
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
.short_team--aside--projects{
  margin-top: 10px;
}
</style>