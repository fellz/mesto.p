<template>
  <div>
    <div v-for="team of teams" :key="team.id">
      <div class="row short_team">
        <main class="col-sm-6 short_team__main">
          <div class="main__head">
            <h4><nuxt-link :to="`/teams/${team.id}`">{{ team.name }}</nuxt-link></h4>
          </div>
          <div>{{ team.about }}</div>  
        </main>
        <aside class="col-sm-6 short_team__aside">
          <header class="row aside">
            <h4 class="col-sm-6">Участники</h4>
            <div class="col-sm-6 text-right text-muted">Создана: {{ team.created_at |  formatDate }}</div>
          </header>
          <hr/>
          <participants :owner_profile="team.leader" :resource="team" />
          <section class="aside__projects">
            <h5>Участвует в проектах</h5>
            <hr/>
            <span v-for="proj of team.projects" :key="proj.id">
              <nuxt-link :to="'/projects/'+proj.id">{{ proj.name }}</nuxt-link>
            </span>
          </section>
        </aside>
      </div>
    </div>
    <pagination @new-start-page="setStartPage($event)" :all_items="all_teams" ></pagination>
  </div>
</template>

<script>
import axios from "axios";
import Participants from "~/components/common/participants.vue";
import Pagination from "~/components/common/pagination.vue";

export default {
   components:{
    Participants,
    Pagination
  },
  data() {
    return {
      teams: [],
      start: 0,
      all_teams: 0,
      baseUrl: process.env.baseUrl,
      defAvatar: process.env.defAvatar  
    }
  },
  created() {
    this.getTeams(this.start)
    this.getAllTeams()
  },
  methods: {
    async getTeams(start){
      const { data } = await axios.get(`${this.baseUrl}/teams?_start=${start}&_limit=5&_sort=created_at:DESC`);
      this.teams = data;
    },
    async getAllTeams(){
      const { data } = await axios.get(`${this.baseUrl}/teams`);
      this.all_teams = data.length
    },
    setStartPage(new_start_page){
      this.getTeams(new_start_page)
    },
  }
};
</script>

<style >
.short_team {
    border-radius: 8px;
    border: 1px solid #d4cfcf;
    padding: 14px;
    margin-bottom: 10px;
    background-color: white;
}
.short_team--main--head{
  display: flex;
  justify-content: space-between;
}
</style>