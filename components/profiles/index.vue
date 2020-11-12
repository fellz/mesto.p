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
    <v-row>
      <v-col  v-for="profile of profiles" :key="profile.id">
        <short-profile :mprofile="profile"  />
      </v-col>
    </v-row>
    
    <!-- pagination --> 
    <pagination  @new-start-number="setStartPage($event)" :all_items="all_profiles" :per_page="per_page" />
  </div>
</template>

<script>
import ShortProfile from "~/components/profiles/short_profile.vue";
import Pagination from "~/components/common/pagination.vue";
import Multiselect from 'vue-multiselect';
import axios from "axios";

export default {
  name: "ProfilesList",
  data() {
    return {
      profiles: [],
      all_profiles: 0,
      resource: "profiles",
      start: 0,
      search: "",
      social: false,
      per_page: 6,
      searchTag: null,
      tags:  []
    };
  },
  components: {
    ShortProfile,
    Pagination,
    Multiselect
  },
  async created() {
    await this.getProfiles(this.start);
    await this.getAllProfiles();
    await this.getSkills();
  },
  methods: {
    // get skills for select
    async getSkills(){
      const data = await this.$axios.$get(`/skills`);
      this.tags = data.map(s => {
        const id = s.id;
        const skill = s.skill;
        return {name: skill, code: id}
      } );
    },
    // default method to take profiles
    async getProfiles(start) {
      this.profiles = await this.$axios.$get(`/profiles?_start=${start}&_limit=6&_sort=created_at:DESC`);
    },
    // for pagination
    async getAllProfiles() {
      const data = await this.$axios.$get(`/profiles/count`);
      this.all_profiles = data;
    },
    // get 'start' number from pagination component
    setStartPage( start) {
      this.getProfiles(start);
    },
    // search profiles by skill
    async searchProfiles(skills, start) {
      let skill_string = ''
      skills.forEach(s=>{
        skill_string += 'skills.skill=' + s.name + '&'
      })
      this.profiles = await this.$axios.$get(`/profiles?${skill_string}_start=${start === undefined ? 0 : start }&_limit=5&_sort=social:DESC`);
      const all_skills = await this.$axios.$get(`/profiles/count?${skill_string}`)
      this.all_profiles = all_skills
    }
  },
  watch: {
    searchTag(newVal){
      this.searchProfiles(newVal)
    }
  }
};
</script>
