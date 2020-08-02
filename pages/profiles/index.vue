<template>
  <div>
    <h4>Участники</h4>
    <multiselect 
      v-model="value" 
      placeholder="Search or add a tag" 
      label="name" track-by="code" 
      :options="options" 
      :multiple="true" 
     >
    </multiselect>
    <!-- sort -->
    <div class="$style.profiles_sort">
      <span>Сортировать список :</span>
      <label>По рейтингу</label>
      <input type="checkbox"
      v-model="social"
      @change="socialSelect()"
       />
    </div>
    <!-- profiles -->
    <div v-for="profile of profiles" :key="profile.id">
      <short-profile :profile="profile" />
    </div>
    <!-- pagination --> 
    <pagination v-if="search === ''" @new-start-number="setStartPage($event)" :all_items="all_profiles" :resource="resource" />
  </div>
</template>

<script>
import ShortProfile from "~/components/profiles/short_profile.vue";
import Pagination from "~/components/common/pagination.vue";
import Multiselect from 'vue-multiselect';
import axios from "axios";

export default {
  data() {
    return {
      profiles: [],
      all_profiles: 0,
      resource: "profiles",
      start: 0,
      search: "",
      social: false,
      baseUrl: process.env.baseUrl,
      per_page: 5,
      value: null,
      options:  []
    };
  },
  components: {
    ShortProfile,
    Pagination,
    Multiselect
  },
  created() {
    this.getProfiles(this.start);
    this.getAllProfiles();
    this.getSkills();
  },
  methods: {
    // get skills for select
    async getSkills(){
      const { data } = await axios.get(`${this.baseUrl}/skills`);
      this.options = data.map(s => {
        const id = s.id;
        const skill = s.skill;
        return {name: skill, code: id}
      } );
    },
    // default method to take profiles
    async getProfiles(start) {
      //const { data } = await axios.get(`${this.baseUrl}/profiles?_start=${start}&_limit=5&_sort=created_at:DESC`);
      //this.profiles = data;
      const res = await fetch(`${this.baseUrl}/profiles?_start=${start}&_limit=5&_sort=created_at:DESC`);
      this.profiles = await res.json()
    },
    // for pagination
    async getAllProfiles() {
      const { data } = await axios.get(`${this.baseUrl}/profiles`);
      this.all_profiles = data.length;
    },
    // get 'start' number from pagination component
    setStartPage( start) {
      this.getProfiles(start);
      if(this.value){
        this.searchProfiles(this.value, start)
      }
    },
    async searchProfiles(skills, start) {
      let skill_string = ''
      skills.forEach(s=>{
        skill_string += 'skills.skill=' + s.name + '&'
      })
      const { data } = await axios.get(`${this.baseUrl}/profiles?${skill_string}_start=${start === undefined ? 0 : start }&_limit=5&_sort=social:DESC`);
      const { data: all_skills } = await axios.get(`${this.baseUrl}/profiles?${skill_string}`)
      this.profiles = data;
      this.all_profiles = all_skills.length
    }
    // async socialSelect(){
    //   if (this.social === true){
    //     const start = 0
    //     const { data } = await axios.get(
    //     `${this.baseUrl}/profiles?_start=${start}&_limit=5&_sort=social:DESC`
    //     );
    //     this.profiles = data;
    //   }else{
    //     this.getProfiles(this.start);
    //     this.getAllProfiles();
    //   }
   // },
  },
  watch: {
    value(newVal){
      //localStorage.skills = JSON.stringify(newVal)
      this.searchProfiles(newVal)
    }
  }
};
</script>

<style langs="scss" module>
.profiles_sort {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>