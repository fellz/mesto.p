<template>
  <div>
    <h3 v-if="loading">Загружаемся....</h3>
    <div v-for="project of projects" :key="project.id">
      <short-project :project="project"   />
    </div>
    <pagination @new-start-number="setStartPage($event)" :all_items="all_projects" :resource="resource"></pagination>
  </div>
</template>

<script>
import ShortProject from "~/components/projects/short_project/index.vue";
import Pagination from "~/components/common/pagination.vue";

export default {
  name: "ProjectsList",
  data() {
    return {
      projects: [],
      all_projects: 0,
      start: 0,
      resource: "projects",
      baseUrl: process.env.baseUrl,
      loading: false
    };
  },
  components: {
    ShortProject,
    Pagination
  },
  async created() {
    this.loading = true
    await this.getProjects(this.start)
    await this.getAllProjects()
    this.loading = false
  },
  methods:{
     async getProjects(start){
      this.projects = await this.$axios.$get(`/projects?_start=${start}&_limit=5&_sort=created_at:DESC`);
    },
    async getAllProjects(){
      this.all_projects = await this.$axios.$get(`${this.baseUrl}/projects/count`);
    },
    setStartPage(new_start_number){
      this.getProjects(new_start_number)
    },
  }
};
</script>