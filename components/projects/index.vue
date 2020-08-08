<template>
  <div>
    <div v-for="project of projects" :key="project.id"  >
      <short-project :project="project" />
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
      baseUrl: process.env.baseUrl
    };
  },
  components: {
    ShortProject,
    Pagination
  },
  created() {
    this.getProjects(this.start)
    this.getAllProjects()
  },
  methods:{
     async getProjects(start){
      //const { data } = await axios.get(`${this.baseUrl}/projects?_start=${start}&_limit=5&_sort=created_at:DESC`);
      const data = await this.$axios.$get(`/projects?_start=${start}&_limit=5&_sort=created_at:DESC`);
      this.projects = data
    },
    async getAllProjects(){
      //const { data } = await axios.get(`${this.baseUrl}/projects`);
      const data = await this.$axios.$get(`${this.baseUrl}/projects`);
      this.all_projects = data.length;
    },
    setStartPage(new_start_number){
      this.getProjects(new_start_number)
    },
  }
};
</script>