<template>
  <div>
    <!-- Skill search -->
    <multiselect
      v-model="searchTag"
      placeholder="Выберите навык"
      label="name" track-by="code"
      :options="tags"
      :multiple="true"
    >
    </multiselect>

    <!-- profiles -->
    <v-container>
      <v-row>
        <v-col  v-for="profile of profiles" :key="profile.id">
          <short-profile :profile="profile"  />
        </v-col>
      </v-row>
    </v-container>

    <!-- pagination -->
    <pagination  @newstart="setStartPage($event)" :allitems="countProfiles" :perpage="perPage" />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import ShortProfile from '~/components/profiles/short_profile.vue';
import Pagination from '~/components/common/pagination.vue';

export default {
  name: 'ProfilesList',
  data() {
    return {
      profiles: [],
      countProfiles: 0,
      resource: 'profiles',
      start: 0,
      search: '',
      social: false,
      perPage: 6,
      searchTag: null,
      tags: [],
    };
  },
  components: {
    ShortProfile,
    Pagination,
    Multiselect,
  },
  created() {
    this.getProfiles(this.start);
    this.getAllProfiles();
    this.getSkills();
  },
  methods: {
    // get skills for select
    async getSkills() {
      const data = await this.$axios.$get('/skills');
      this.tags = data.map((s) => {
        const { id } = s;
        const { skill } = s;
        return { name: skill, code: id };
      });
    },
    // default method to take profiles
    async getProfiles(start) {
      this.profiles = await this.$axios.$get(`/profiles?_start=${start}&_limit=6&_sort=created_at:DESC`);
    },
    // for pagination
    async getAllProfiles() {
      const data = await this.$axios.$get('/profiles/count');
      this.countProfiles = data;
    },
    // get 'start' number from pagination component
    setStartPage(start) {
      this.getProfiles(start);
    },
    // search profiles by skill
    async searchProfiles(skills, start = 0) {
      let skillString = '';
      skills.forEach((s) => {
        skillString += `skills.skill=${s.name}&`;
      });
      this.profiles = await this.$axios.$get(`/profiles?${skillString}_start=${start}&_limit=5&_sort=social:DESC`);
      const countSkills = await this.$axios.$get(`/profiles/count?${skillString}`);
      this.countProfiles = countSkills;
    },
  },
  watch: {
    searchTag(newVal) {
      this.searchProfiles(newVal);
    },
  },
};
</script>
