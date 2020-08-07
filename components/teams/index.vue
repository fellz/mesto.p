<template>
  <div>
    <div v-for="team of teams" :key="team.id">
      <short-team :team="team" />
    </div>
    <pagination @new-start-page="setStartPage($event)" :all_items="all_teams" ></pagination>
  </div>
</template>

<script>
import axios from "axios";
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