<template>
  <div>
    <div v-for="team of teams" :key="team.id">
      <short-team :team="team" />
    </div>
    <pagination @newstart="setStartPage($event)"
      :allitems="all_teams" :perpage="per_page"></pagination>
  </div>
</template>

<script>
import ShortTeam from '~/components/teams/short_team.vue';
import Pagination from '~/components/common/pagination.vue';

export default {
  name: 'MestoTeams',
  components: {
    ShortTeam,
    Pagination,
  },
  data() {
    return {
      teams: [],
      start: 0,
      per_page: 6,
      all_teams: 0,
      baseUrl: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
    };
  },
  async fetch() {
    await this.getTeams(this.start);
    await this.getAllTeams();
  },
  methods: {
    async getTeams(start) {
      try {
        const resp = await this.$axios.$get(`/teams?_start=${start}&_limit=5&_sort=created_at:DESC`);
        if (!Array.isArray(resp)) { return new Error('не массив'); }
        if (resp.length === 0) { return new Error('пустой массив'); }
        this.profiles = resp;
        return this.profiles;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getAllTeams() {
      const data = await this.$axios.$get('/teams/count');
      this.all_teams = data;
    },
    setStartPage(newStartPage) {
      this.getTeams(newStartPage);
    },
  },
};
</script>
