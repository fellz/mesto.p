<template>
  <div>
    <div v-for="team of teams" :key="team.id">
      <short-team :team="team" />
    </div>
    <pagination @new-start-page="setStartPage($event)" :all_items="all_teams" ></pagination>
  </div>
</template>

<script>
import ShortTeam from "~/components/teams/short_team.vue";
import Pagination from "~/components/common/pagination.vue";

export default {
  name: "MestoTeams",
  components:{
    ShortTeam,
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
  async fetch() {
    await this.getTeams(this.start)
    await this.getAllTeams()
  },
  methods: {
    async getTeams(start){
      this.teams = await this.$axios.$get(`/teams?_start=${start}&_limit=5&_sort=created_at:DESC`);
    },
    // FIX: crazy to take all team projects or profiles
    async getAllTeams(){
      const data = await this.$axios.$get(`/teams/count`);
      this.all_teams = data
    },
    setStartPage(new_start_page){
      this.getTeams(new_start_page)
    },
  }
};
</script>