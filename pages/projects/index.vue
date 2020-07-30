<template>
  <div class="projects">
    <div v-for="project of projects" :key="project.id"  >
      <short-project :project="project" />
    </div>
    <pagination @new-start-page="setStartPage($event)" :all_items="all_projects" ></pagination>
  </div>
</template>

<script>
import axios from "axios";
import ShortProject from "~/components/short_project/index.vue";
import Pagination from "~/components/pagination.vue";

export default {
  data() {
    return {
      projects: [],
      all_projects: 0,
      start: 0,
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
      const { data } = await axios.get(`${this.baseUrl}/projects?_start=${start}&_limit=5&_sort=created_at:DESC`);
      this.projects = data
    },
    async getAllProjects(){
      const { data } = await axios.get(`${this.baseUrl}/projects`);
      this.all_projects = data.length
    },
    setStartPage(new_start_page){
      this.getProjects(new_start_page)
    },
  }
};
</script>

<style>
.card_margin {
  margin-bottom: 30px;
}
.project_name {
  font-weight: bold;
  font-size: 24px;
}
.profiles {
  margin-left: 10px;
}
.projects_paging_margin {
  margin-right: 5px;
}
</style>