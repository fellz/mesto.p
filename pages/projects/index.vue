<template>
  <div>
    <div v-for="project of projects" :key="project.id"  >
      <short-project :project="project" />
    </div>
    <pagination :all_items="all_projects" :resource="'projects'"></pagination>
  </div>
</template>

<script>
import axios from "axios";
import ShortProject from "~/components/short_project.vue";
import Pagination from "~/components/pagination.vue";

export default {
  data() {
    return {
      projects: [],
      all_projects: 0,
      start: 0,
    };
  },
  components: {
    ShortProject,
    Pagination
  },
  async fetch () {
    this.$store.dispatch("getItems", {resource: 'projects', start: this.start} );
    // Get number of all projects - for pagination
    const {data:proj} = await axios.get(`${process.env.baseUrl}/projects`)
    this.all_projects = proj.length;
  },
  watch: {
    "$store.state.projects": function() {
      console.log('Re-render projects')
      this.projects = this.$store.state.projects;
    }
  },
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