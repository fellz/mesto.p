<template>
    <div>
        <h3 v-if="loading">Загружаемся....</h3>
        <h3 v-if="error">Ошибка...{{ error_message }}</h3>
        <div v-else>
          <div v-for="project of projects" :key="project.id">
            <short-project :project="project" />
          </div>
            <pagination
              @newstart="setStartPage($event)"
              :allitems="pagination_all_projects"
              :perpage="projects_per_page"></pagination>
        </div>
    </div>
</template>

<script>
import ShortProject from '~/components/projects/short_project/index.vue';
import Pagination from '~/components/common/pagination.vue';

export default {
  name: 'ProjectsList',
  data() {
    return {
      projects: [],
      pagination_all_projects: 0,
      projects_per_page: 3,
      start: 0,
      resource: 'projects',
      loading: false,
      error: false,
      error_message: '',
    };
  },
  components: {
    ShortProject,
    Pagination,
  },
  async created() {
    this.loading = true;
    await this.getProjects(this.start);
    await this.getAllProjects();
    this.loading = false;
  },
  methods: {
    async getProjects(start) {
      try {
        const resp = await this.$axios.$get(
          `/projects?_start=${start}&_limit=${this.projects_per_page}&_sort=created_at:DESC`,
        );
        if (!Array.isArray(resp)) { return new Error('не массив'); }
        if (resp.length === 0) { return new Error('пустой массив'); }
        this.projects = resp;
        return this.projects;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getAllProjects() {
      try {
        const resp = await this.$axios.$get('/projects/count');
        if (typeof resp === 'number') {
          this.pagination_all_projects = resp;
        } else {
          throw Error('Response is not number');
        }
      } catch (err) {
        this.error = true;
        this.error_message = err;
      }
    },
    setStartPage(newStartNumber) {
      this.getProjects(newStartNumber);
    },
  },
};
</script>
